import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";

import { AxiosError } from "axios";

import { Auth } from "@services/api/auth";
import {
  storageAuthJwtGet,
  storageAuthJwtRemove,
  storageAuthUserRemove,
  storageAuthSave,
} from "@storage/storageAuth";

// Tipos
interface AuthContextData {
  logout: () => void;
  signIn: (username: string, password: string) => Promise<string | void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

// Criação do contexto
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

/**
 * Provider de autenticação que gerencia o estado de autenticação do usuário
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const expirationTimerRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Realiza o login do usuário
   */
  const signIn = useCallback(
    async (username: string, password: string): Promise<string | void> => {
      try {
        const response = await Auth.signIn({
          username: username,
          password: password,
        });

        // Salva o token e dados do usuário no localStorage
        storageAuthSave(response);

        tokenLifeTime();
      } catch (error) {
        throw error as AxiosError;
      }
    },
    []
  );

  /**
   * Realiza o logout do usuário
   */
  const logout = useCallback(async () => {
    // Remove o token do localStorage e do estado
    await storageAuthJwtRemove();

    // Remove os dados do usuário
    await storageAuthUserRemove();

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
    const storedToken = storageAuthJwtGet();

    if (storedToken) {
      tokenLifeTime();
    }

    // Cleanup ao desmontar
    return () => {
      if (expirationTimerRef.current) {
        clearTimeout(expirationTimerRef.current);

        expirationTimerRef.current = null;
      }
    };
  }, []);

  // Define o tempo de vida do token
  const tokenLifeTime = useCallback(() => {
    // Limpa qualquer timer existente
    if (expirationTimerRef.current) {
      clearTimeout(expirationTimerRef.current);
      expirationTimerRef.current = null;
    }

    // Configura um novo timer para expiração do token
    expirationTimerRef.current = setTimeout(async () => {
      await storageAuthJwtRemove();

      expirationTimerRef.current = null;
    }, 1000 * 60 * 60 * 24);
  }, []);

  // Valores expostos pelo contexto
  const contextValue = useMemo(
    () => ({
      signIn,
      logout,
    }),
    [signIn, logout]
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
