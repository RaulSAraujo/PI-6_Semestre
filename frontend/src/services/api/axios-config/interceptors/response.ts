import { AxiosInstance, AxiosResponse } from "axios";

/**
 * Interceptor para processar respostas bem-sucedidas
 */
export const setupResponseInterceptor = (instance: AxiosInstance): void => {
  instance.interceptors.response.use((response: AxiosResponse) => {
    return response;
  });
};
