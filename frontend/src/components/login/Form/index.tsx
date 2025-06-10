import { useState } from "react";

import * as yup from "yup";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "@contexts/AuthContext";
import { loginSchema } from "@utils/validation/loginSchema";

import { Header } from "./Header";
import { Submit } from "./Submit";
import { Redirect } from "./Redirect";
import { StyledPaper } from "./styles";
import { Password, Username } from "./Inputs";
import { Box, Divider } from "@mui/material";

export function Form() {
  const navigate = useNavigate();

  const { signIn } = useAuthContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);
    setUsernameError("");
    setPasswordError("");

    try {
      const validation = await loginSchema.validate(
        { username, password },
        { abortEarly: false }
      );

      await signIn(validation.username, validation.password);

      navigate("/pagina-inicial");
    } catch (errors) {
      const e = errors as yup.ValidationError;

      e.inner.forEach((error) => {
        if (error.path === "username") {
          setUsernameError(error.message);
        } else if (error.path === "password") {
          setPasswordError(error.message);
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledPaper elevation={0}>
      <Header />

      <Box sx={{ mb: 2 }}>
        <Username
          username={username}
          disabled={isLoading}
          setUsername={setUsername}
          handleSubmit={handleSubmit}
          usernameError={usernameError}
          setUsernameError={setUsernameError}
        />

        <Box sx={{ my: 2 }} />

        <Password
          password={password}
          disabled={isLoading}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          passwordError={passwordError}
          setPasswordError={setPasswordError}
        />
      </Box>

      <Submit isLoading={isLoading} handleSubmit={handleSubmit} />

      <Redirect isLoading={isLoading} />
    </StyledPaper>
  );
}
