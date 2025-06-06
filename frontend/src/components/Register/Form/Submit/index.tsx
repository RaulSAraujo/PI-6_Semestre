import { Box } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";

import { ActionButton } from "./styles";

type Props = {
  isLoading: boolean;
  handleSubmit: () => void;
};

export function Submit({ isLoading, handleSubmit }: Props) {
  return (
    <Box sx={{ mt: 1 }}>
      <ActionButton
        variant="contained"
        fullWidth
        disabled={isLoading}
        onClick={handleSubmit}
        endIcon={<PersonAdd />}
      >
        {isLoading ? "Cadastrando..." : "Criar conta"}
      </ActionButton>
    </Box>
  );
}
