import axios, { AxiosError } from 'axios';
import { AxiosCacheInstance, setupCache } from 'axios-cache-interceptor';

import { Auth } from '@dtos/LoginDTO';

import { AppError } from '../utils/AppError';
import { storageAuthGet, storageAuthSave } from '../storage/storageAuth';

type SignOut = () => void;

type PromiseType = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
};

type APIInstanceProps = AxiosCacheInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
};

const api = setupCache(
  axios.create({ baseURL: process.env.EXPO_PUBLIC_API_URL })
) as APIInstanceProps;

let failedQueue: PromiseType[] = [];
let isRefreshing = false;

api.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      if (requestError.response?.status === 401) {
        if (requestError.response.data?.error === 'Token expirado') {
          const { access_token, username, password } = await storageAuthGet();

          if (!access_token) {
            signOut();
            return Promise.reject(requestError);
          }

          const originalRequestConfig = requestError.config;

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({
                onSuccess: (token: string) => {
                  originalRequestConfig.headers = { authorization: token };

                  resolve(api(originalRequestConfig));
                },
                onFailure: (error) => {
                  reject(error);
                },
              });
            });
          }

          isRefreshing = true;

          return new Promise(async (resolve, reject) => {
            try {
              const res = await api.post<Auth>(
                '/sign-in',
                {
                  username,
                  password,
                },
                {
                  headers: {
                    Authorization: null,
                  },
                }
              );

              storageAuthSave({ ...res.data, username, password });

              if (originalRequestConfig.data) {
                originalRequestConfig.data = JSON.parse(originalRequestConfig.data);
              }

              originalRequestConfig.headers = { Authorization: res.data.access_token };
              api.defaults.headers.common['Authorization'] = res.data.access_token;

              failedQueue.forEach((request) => {
                request.onSuccess(res.data.access_token);
              });

              console.log('Token atualizado');

              resolve(api(originalRequestConfig));
            } catch (error: any) {
              failedQueue.forEach((request) => {
                request.onFailure(error);
              });

              signOut();
              reject(error);
            } finally {
              isRefreshing = false;
              failedQueue = [];
            }
          });
        }

        signOut();
      }

      if (requestError.response && requestError.response.data) {
        return Promise.reject(
          new AppError(requestError.response.data?.error, requestError.response.data?.message)
        );
      } else {
        return Promise.reject(requestError);
      }
    }
  );

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  };
};

export { api };
