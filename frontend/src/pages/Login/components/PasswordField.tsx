import React, { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { StyledTextField } from "./StyledComponents";

interface PasswordFieldProps {
  password: string;
  setPassword: (password: string) => void;
  passwordError: string;
  setPasswordError: (error: string) => void;
  isLoading: boolean;
  onEnterPress: () => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  password,
  setPassword,
  passwordError,
  setPasswordError,
  isLoading,
  onEnterPress,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <StyledTextField
      fullWidth
      variant="outlined"
      label="Senha"
      type={showPassword ? "text" : "password"}
      value={password}
      disabled={isLoading}
      error={!!passwordError}
      helperText={passwordError}
      onKeyDown={(e) => {
        setPasswordError("");
        if (e.key === "Enter") onEnterPress();
      }}
      onChange={(e) => setPassword(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleTogglePasswordVisibility}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordField;
