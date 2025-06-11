import { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { storageAuthJwtGet } from "@storage/storageAuth";

/**
 * Interceptor para processar requisições antes de serem enviadas
 */
export const setupRequestInterceptor = (instance: AxiosInstance): void => {
  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const token = await storageAuthJwtGet();

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
