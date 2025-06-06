import { Form, Logo } from "@components/Login";
import { Box, Container, Fade } from "@mui/material";

import { PageContainer } from "./styles";

export function LoginScreen() {
  return (
    <PageContainer>
      <Container maxWidth="xs" sx={{ position: "relative", zIndex: 1 }}>
        <Fade in timeout={800}>
          <Box>
            <Logo />

            <Form />
          </Box>
        </Fade>
      </Container>
    </PageContainer>
  );
}
