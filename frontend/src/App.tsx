import { ReactNode } from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AppRoutes } from "@routes/index";
import { Cadastro, LoginScreen } from "@pages/index";
import {
  AppThemeProvider,
  AuthProvider,
  DrawerProvider,
  useAuthContext,
} from "@contexts/index";

const RootRedirect = () => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? (
    <Navigate to="/pagina-inicial" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuthContext();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <DrawerProvider>
          <BrowserRouter>
            <Routes>
              {/* Rota raiz que redireciona com base na autenticação */}
              <Route path="/" element={<RootRedirect />} />

              {/* Rotas públicas */}
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/cadastro" element={<Cadastro />} />

              {/* Rotas protegidas */}
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <AppRoutes />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </DrawerProvider>
      </AppThemeProvider>
    </AuthProvider>
  );
};
