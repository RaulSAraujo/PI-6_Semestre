import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import { Login as LoginIcon } from "@mui/icons-material";
import { useAuthContext } from "@contexts/AutheContext";
import { loginSchema } from "@utils/validation/loginSchema";
import {
  StyledTextField,
  ActionButton,
  SignUpButton,
  StyledPaper,
} from "./StyledComponents";
import PasswordField from "./PasswordField";

const LoginForm: React.FC = () => {
  const { signIn } = useAuthContext();
  const navigate = useNavigate();
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = () => {
    setIsLoading(true);
    setUsernameError("");
    setPasswordError("");

    loginSchema
      .validate({ username, password }, { abortEarly: false })
      .then((dadosValidados) => {
        signIn(dadosValidados.username, dadosValidados.password).then(() => {
          setIsLoading(false);
          navigate("/pagina-inicial");
        });
      })
      .catch((errors) => {
        setIsLoading(false);

        errors.inner.forEach((error: { path: string; message: React.SetStateAction<string>; }) => {
          if (error.path === "username") {
            setUsernameError(error.message);
          } else if (error.path === "password") {
            setPasswordError(error.message);
          }
        });
      });
  };

  return (
    <StyledPaper elevation={0}>
      <Typography
        variant="h5"
        align="center"
        fontWeight="700"
        color="primary"
        gutterBottom
        sx={{ mb: 3 }}
      >
        Bem-vindo de volta
      </Typography>

      <Typography
        variant="body2"
        align="center"
        color="textSecondary"
        sx={{ mb: 4 }}
      >
        Faça login para acessar sua conta
      </Typography>

      <StyledTextField
        fullWidth
        variant="outlined"
        label="Email"
        value={username}
        disabled={isLoading}
        error={!!usernameError}
        helperText={usernameError}
        onKeyDown={(e) => {
          setUsernameError("");
          if (e.key === "Enter") handleSubmit();
        }}
        onChange={(e) => setUsername(e.target.value)}
      />

      <PasswordField
        password={password}
        setPassword={setPassword}
        passwordError={passwordError}
        setPasswordError={setPasswordError}
        isLoading={isLoading}
        onEnterPress={handleSubmit}
      />

      <ActionButton
        variant="contained"
        fullWidth
        disabled={isLoading}
        onClick={handleSubmit}
        endIcon={<LoginIcon />}
        sx={{ mb: 2 }}
      >
        {isLoading ? "Entrando..." : "Entrar"}
      </ActionButton>

      <Box display="flex" justifyContent="center">
        <SignUpButton
          disabled={isLoading}
          onClick={() => navigate("/cadastro")}
        >
          Não tem uma conta?{" "}
          <span
            style={{
              color: theme.palette.primary.main,
              marginLeft: 4,
              fontWeight: 600,
            }}
          >
            Cadastre-se
          </span>
        </SignUpButton>
      </Box>
    </StyledPaper>
  );
};

export default LoginForm;
