import { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { Environment } from "../../../../environment";

/**
 * Interceptor para processar requisições antes de serem enviadas
 */
export const setupRequestInterceptor = (instance: AxiosInstance): void => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem(
        Environment.LOCAL_STORAGE_KEY_ACCESS_TOKEN
      );

      if (token) {
        config.headers.Authorization = `${token}`;
      }

      return config;
    },
    (error) => {
      console.error("[Request Error]", error);

      return Promise.reject(error);
    }
  );
};
