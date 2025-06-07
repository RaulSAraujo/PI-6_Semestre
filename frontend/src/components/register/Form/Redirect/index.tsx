import { useNavigate } from "react-router-dom";

import { Box, useTheme } from "@mui/material";

import { SignUpButton } from "./styles";

type Props = {
  isLoading: boolean;
};

export function Redirect({ isLoading }: Props) {
  const theme = useTheme();

  const navigate = useNavigate();

  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <SignUpButton
        variant="text"
        disabled={isLoading}
        onClick={() => navigate("/")}
      >
        Já tem uma conta?{" "}
        <span
          style={{
            color: theme.palette.primary.main,
            marginLeft: 4,
            fontWeight: 600,
          }}
        >
          Faça login
        </span>
      </SignUpButton>
    </Box>
  );
}
