import React from "react";

import { Box, Container, Fade } from "@mui/material";

import LoginForm from "./components/LoginForm";
import LogoSection from "./components/LogoSection";
import { PageContainer } from "./components/StyledComponents";

export const LoginScreen: React.FC = () => {
  return (
    <PageContainer>
      <Container maxWidth="xs" sx={{ position: "relative", zIndex: 1 }}>
        <Fade in timeout={800}>
          <Box>
            <LogoSection />
            <LoginForm />
          </Box>
        </Fade>
      </Container>
    </PageContainer>
  );
};