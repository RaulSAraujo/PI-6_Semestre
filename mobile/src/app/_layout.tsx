import { useEffect, useMemo } from 'react';

import { StatusBar } from 'react-native';
import { router, Slot } from 'expo-router';

import { theme } from '@styles/theme';
import { useAuth } from '@hooks/useAuth';
import { ThemeProvider } from '@rneui/themed';
import { AuthProvider } from '@context/AuthContext';
import { ToastProvider } from '@context/ToastContext';
import ToastContainer from '@components/Global/ToastContainer';

function InitialLayout() {
  const { auth, isLoadingAuthStorage } = useAuth();

  useEffect(() => {
    if (isLoadingAuthStorage) return;

    if (auth?.access_token) {
      router.replace('/(auth)/wallet');
    } else {
      router.replace('/(public)/signin');
    }
  }, [auth, isLoadingAuthStorage]);

  return <Slot />;
}

export default function PublicLayout() {
  const memoizedTheme = useMemo(() => theme, []);

  return (
    <ThemeProvider theme={memoizedTheme}>
      <StatusBar hidden />

      <AuthProvider>
        <ToastProvider>
          <InitialLayout />

          <ToastContainer />
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
