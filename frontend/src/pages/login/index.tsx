import { useState } from "react";

import { Navigate } from "react-router-dom";

import { Form, Logo } from "@components/login";
import { useAuthContext } from "@contexts/AuthContext";
import { Alert, Box, Container, Fade } from "@mui/material";

import { PageContainer } from "./styles";

export function LoginScreen() {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to="/pagina-inicial" replace />;
  }

  const [error, setError] = useState("");

  return (
    <PageContainer>
      <Container maxWidth="xs" sx={{ position: "relative", zIndex: 1 }}>
        <Fade in timeout={800}>
          <Box>
            <Logo />

            <Form setError={setError} />

            {error && (
              <Alert
                severity="error"
                sx={{ mt: 2 }}
                onClose={() => setError("")}
              >
                {error}
              </Alert>
            )}
          </Box>
        </Fade>
      </Container>
    </PageContainer>
  );
}
