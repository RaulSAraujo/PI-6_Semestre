import { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { TextField } from "@components/common";

interface Props {
  password: string;
  disabled: boolean;
  passwordError: string;
  handleSubmit: () => void;
  setPasswordError: (error: string) => void;
  setPassword: (password: string) => void;
}

export function Password(props: Props) {
  const {
    disabled,
    password,
    handleSubmit,
    passwordError,
    setPassword,
    setPasswordError,
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function renderIconPassword() {
    return (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleTogglePasswordVisibility}
          edge="end"
        >
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    );
  }

  return (
    <TextField
      label="Senha"
      value={password}
      disabled={disabled}
      error={passwordError}
      onChange={setPassword}
      setError={setPasswordError}
      handleSubmit={handleSubmit}
      type={showPassword ? "text" : "password"}
      InputProps={{ endAdornment: renderIconPassword() }}
    />
  );
}
