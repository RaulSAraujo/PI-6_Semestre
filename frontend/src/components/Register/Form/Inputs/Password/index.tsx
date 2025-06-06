import { useState } from "react";

import { TextField } from "@components/common";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, useTheme } from "@mui/material";

type Props = {
  password: string;
  setPassword: (value: string) => void;
  setPasswordError: (value: string) => void;
  passwordError: string;
  handleSubmit: () => void;
  isLoading: boolean;
};

export function PasswordInput(props: Props) {
  const {
    password,
    setPassword,
    setPasswordError,
    passwordError,
    handleSubmit,
    isLoading,
  } = props;

  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      label="Senha"
      value={password}
      disabled={isLoading}
      error={passwordError}
      onChange={setPassword}
      setError={setPasswordError}
      handleSubmit={handleSubmit}
      type={showPassword ? "text" : "password"}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Box
              sx={{
                width: 24,
                height: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: theme.palette.text.secondary,
              }}
            >
              🔒
            </Box>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleTogglePasswordVisibility}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
