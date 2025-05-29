import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { AuthService } from "@services/api/auth/AuthService";

// Tipos
interface AuthContextData {
  isAuthenticated: boolean;
  signIn: (username: string, password: string) => Promise<string | void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

// Constantes
const AUTH_TOKEN_KEY = "ACCESS_TOKEN";
const TOKEN_LIFETIME = 15 * 60 * 1000; // 15 minutos em milissegundos

// Criação do contexto
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

/**
 * Provider de autenticação que gerencia o estado de autenticação do usuário
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Estado para armazenar o token de acesso
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  });

  // Referência para o timeout de expiração do token
  const expirationTimerRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Define o token e configura sua expiração automática
   */
  const setupToken = useCallback((newToken: string) => {
    // Salva o token no localStorage e no estado
    localStorage.setItem(AUTH_TOKEN_KEY, newToken);
    setToken(newToken);

    // Limpa qualquer timer existente
    if (expirationTimerRef.current) {
      clearTimeout(expirationTimerRef.current);
      expirationTimerRef.current = null;
    }

    // Configura um novo timer para expiração do token
    expirationTimerRef.current = setTimeout(() => {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      setToken(null);
      expirationTimerRef.current = null;
    }, TOKEN_LIFETIME);
  }, []);

  /**
   * Realiza o login do usuário
   */
  const signIn = useCallback(
    async (username: string, password: string): Promise<string | void> => {
      try {
        const response = await AuthService.auth(username, password);

        if (response instanceof Error) {
          return response.message;
        }

        setupToken(response.access_token);
      } catch (error) {
        console.error("Erro durante autenticação:", error);

        if (error instanceof Error) {
          return error.message;
        }

        return "Falha na autenticação. Tente novamente.";
      }
    },
    [setupToken]
  );

  /**
   * Realiza o logout do usuário
   */
  const logout = useCallback(() => {
    // Remove o token do localStorage e do estado
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setToken(null);

    // Cancela o timer de expiração
    if (expirationTimerRef.current) {
      clearTimeout(expirationTimerRef.current);
      expirationTimerRef.current = null;
    }
  }, []);

  /**
   * Inicializa o token ao montar o componente
   */
  useEffect(() => {
    const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);

    console.log("Stored token:", storedToken);

    if (storedToken) {
      setupToken(storedToken);
    }

    // Cleanup ao desmontar
    return () => {
      if (expirationTimerRef.current) {
        clearTimeout(expirationTimerRef.current);
        expirationTimerRef.current = null;
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Determina se o usuário está autenticado
  const isAuthenticated = useMemo(() => !!token, [token]);

  // Valores expostos pelo contexto
  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      signIn,
      logout,
    }),
    [isAuthenticated, signIn, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

/**
 * Hook para acessar o contexto de autenticação
 */
export const useAuthContext = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext deve ser usado dentro de um AuthProvider");
  }

  return context;
};
