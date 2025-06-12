import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppRoutes } from "@routes/index";
import { Cadastro, LoginScreen } from "@pages/index";
import { storageAuthJwtGet } from "@storage/storageAuth";
import {
  AppThemeProvider,
  AuthProvider,
  DrawerProvider,
  TableProvider,
} from "@contexts/index";

// Componente para rotas protegidas
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const authToken = storageAuthJwtGet();

  return !!authToken ? children : <Navigate to="/login" replace />;
};

// Componente para rotas públicas (redireciona se já autenticado)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const authToken = storageAuthJwtGet();

  return !authToken ? children : <Navigate to="/pagina-inicial" replace />;
};

export const App = () => {
  return (
    <AppThemeProvider>
      <AuthProvider>
        <DrawerProvider>
          <TableProvider>
            <BrowserRouter>
              <Routes>
                {/* Rotas públicas */}
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <LoginScreen />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/cadastro"
                  element={
                    <PublicRoute>
                      <Cadastro />
                    </PublicRoute>
                  }
                />

                {/* Rotas protegidas */}
                <Route
                  path="/*"
                  element={
                    <ProtectedRoute>
                      <AppRoutes />
                    </ProtectedRoute>
                  }
                />

                {/* Rota raiz */}
                <Route path="/" element={<Navigate to="/login" replace />} />
              </Routes>
            </BrowserRouter>
          </TableProvider>
        </DrawerProvider>
      </AuthProvider>
    </AppThemeProvider>
  );
};
