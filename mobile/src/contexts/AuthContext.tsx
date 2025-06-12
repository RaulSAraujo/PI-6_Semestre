import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { router } from 'expo-router';
import { jwtDecode } from 'jwt-decode';

import { api } from '../services/api';
import { Auth, User, FormSignIn } from '../dtos/LoginDTO';
import { storageAuthGet, storageAuthRemove, storageAuthSave } from '../storage/storageAuth';

export type AuthContextDataProps = {
  singIn: (data: FormSignIn) => void;
  signOut: () => Promise<void>;
  auth: Auth | null;
  user: User | null;
  isLoadingAuthStorage: boolean;
  formSignIn: FormSignIn | null;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);
  const [formSignIn, setFormSignIn] = useState<FormSignIn | null>(null);
  const [isLoadingAuthStorage, setIsLoadingAuthStorage] = useState(true);

  const loadUserData = useCallback(async (user: User) => {
    setUser(user);
  }, []);

  const loadAuthData = useCallback(async () => {
    try {
      const authLogged = await storageAuthGet();

      if (authLogged) {
        setAuth(authLogged);

        api.defaults.headers.common['Authorization'] = authLogged.access_token;

        await loadUserData(authLogged.user);
      }
    } catch (error) {
      console.error('Auth storage error:', error);
    } finally {
      setIsLoadingAuthStorage(false);
    }
  }, [loadUserData]);

  const singIn = useCallback(
    async (data: FormSignIn) => {
      try {
        const res = await api.post<Auth>('/sign-in', data);

        setAuth(res.data);

        setFormSignIn(data);

        storageAuthSave({ ...res.data, ...data });

        api.defaults.headers.common['Authorization'] = res.data.access_token;

        await loadUserData(res.data.user);
      } catch (e) {
        console.error('Login error:', e);

        throw e;
      }
    },
    [loadUserData]
  );

  const signOut = useCallback(async () => {
    await storageAuthRemove();

    setAuth(null);

    setUser(null);

    router.push('/signin');
  }, []);

  useEffect(() => {
    loadAuthData();
  }, [loadAuthData]);

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut);

    return () => subscribe();
  }, [signOut]);

  const contextValue = useMemo(
    () => ({
      singIn,
      signOut,
      auth,
      user,
      isLoadingAuthStorage,
      formSignIn,
    }),
    [singIn, signOut, auth, user, isLoadingAuthStorage, formSignIn]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
