import { AxiosError, AxiosInstance } from "axios";

// Tipos de erro conhecidos
interface ApiError {
  message: string;
  code: string;
  details?: string;
}

export const setupErrorInterceptor = (instance: AxiosInstance): void => {
  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      // Extrai informações do erro
      const status = error.response?.status;
      const data = error.response?.data as ApiError | undefined;
      const url = error.config?.url;
      const method = error.config?.method?.toUpperCase();

      // Log detalhado do erro
      console.error(`[API Error] ${method} ${url} - Status: ${status}`, {
        error,
        data,
      });

      // Tratamento específico por status de erro
      switch (status) {
        case 401:
          // Token expirado ou inválido
          localStorage.removeItem("APP_ACCESS_TOKEN");

          // Redireciona para login
          window.location.href = "/login";

          break;

        case 403:
          // Acesso negado
          Promise.reject(
            new Error("Você não tem permissão para acessar este recurso.")
          );
          break;

        case 404:
          // Recurso não encontrado
          Promise.reject(new Error("O recurso solicitado não foi encontrado."));
          break;

        case 422:
          // Erro de validação
          const validationMessage =
            data?.message || "Erro de validação nos dados enviados.";

          Promise.reject(new Error(validationMessage));
          break;

        case 429:
          // Rate limiting
          Promise.reject(
            new Error(
              "Muitas requisições. Por favor, aguarde um momento e tente novamente"
            )
          );
          break;

        case 500:
        case 502:
        case 503:
        case 504:
          // Erros de servidor
          Promise.reject(
            new Error(
              "Ocorreu um erro no servidor. Tente novamente mais tarde."
            )
          );
          break;

        default:
          // Outros erros
          if (!navigator.onLine) {
            Promise.reject(
              new Error(
                "Sem conexão com a internet. Verifique sua conexão e tente novamente."
              )
            );
          } else {
            Promise.reject(
              new Error(data?.message || "Ocorreu um erro inesperado.")
            );
          }
          break;
      }

      // Cria um objeto de erro mais informativo
      const enhancedError = new Error(data?.message || error.message) as any;
      enhancedError.status = status;
      enhancedError.data = data;
      enhancedError.originalError = error;

      return Promise.reject(enhancedError);
    }
  );
};
