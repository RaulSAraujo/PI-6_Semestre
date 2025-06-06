import { useState } from "react";

import { BackButton, Form, Logo, SuccessMessage } from "@components/Register";
import { Box, Container, Fade } from "@mui/material";

import { PageContainer } from "./styles";

export function Cadastro() {
  const [successMessage, setSuccessMessage] = useState("");

  return (
    <PageContainer>
      <BackButton />

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Fade in timeout={800}>
          <Box>
            <Logo />

            <Form setSuccessMessage={setSuccessMessage} />
          </Box>
        </Fade>
      </Container>

      <SuccessMessage
        successMessage={successMessage}
        setSuccessMessage={setSuccessMessage}
      />
    </PageContainer>
  );
}
