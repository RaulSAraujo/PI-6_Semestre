import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import { Environment } from "../../../environment";
import { setupErrorInterceptor } from "./interceptors/error";
import { setupRequestInterceptor } from "./interceptors/request";
import { setupResponseInterceptor } from "./interceptors/response";

/**
 * Configuração padrão para todas as instâncias do Axios
 */
const defaultConfig: AxiosRequestConfig = {
  baseURL: Environment.REACT_APP_API_URL,
};

/**
 * Cria e configura uma instância do Axios
 * @param config Configurações adicionais para sobrescrever as padrões
 * @returns Instância configurada do Axios
 */
export const createApiInstance = (
  config: AxiosRequestConfig = {}
): AxiosInstance => {
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
  const instance = axios.create(axiosConfig);

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

/**
 * Instância para upload de arquivos
 */
export const UploadApi = createApiInstance({
  headers: {
    "Content-Type": "multipart/form-data",
  },
  timeout: 60000, // 60 segundos para uploads
});

/**
 * Instância para requisições que não precisam de token
 */
export const PublicApi = createApiInstance();

/**
 * Utilitário para verificar se a API está online
 * @returns Promise que resolve para true se a API estiver online
 */
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await PublicApi.get("/health", { timeout: 5000 });
    return response.status === 200;
  } catch (error) {
    console.error("API health check failed:", error);
    return false;
  }
};

export default Api;
