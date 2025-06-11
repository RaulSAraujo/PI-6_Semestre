import axios from "axios";
import { setupCache, CacheRequestConfig } from "axios-cache-interceptor";

import { setupErrorInterceptor } from "./interceptors/error";
import { setupRequestInterceptor } from "./interceptors/request";
import { setupResponseInterceptor } from "./interceptors/response";

/**
 * Configuração padrão para todas as instâncias do Axios
 */
const defaultConfig: CacheRequestConfig = {
  baseURL: import.meta.env.VITE_API_URL,
};

/**
 * Cria e configura uma instância do Axios
 * @param config Configurações adicionais para sobrescrever as padrões
 * @returns Instância configurada do Axios
 */
export const createApiInstance = (config: CacheRequestConfig = {}) => {
  // Mescla as configurações padrão com as fornecidas
  const axiosConfig = {
    ...defaultConfig,
    ...config,
    headers: {
      ...defaultConfig.headers,
      ...config.headers,
    },
  };

  // Cria a instância
  const instance = setupCache(axios.create(axiosConfig), {
    location: "client",
    ttl: 1000 * 60 * 5, // 5 minutos
  });

  // Configura os interceptors
  setupRequestInterceptor(instance);
  setupResponseInterceptor(instance);
  setupErrorInterceptor(instance);

  return instance;
};

/**
 * Instância principal da API
 */
export const Api = createApiInstance();

export default Api;
