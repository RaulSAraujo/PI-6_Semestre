import { ActionButton } from "./styles";
import { Login as LoginIcon } from "@mui/icons-material";

type Props = {
  isLoading: boolean;
  handleSubmit: () => void;
};

export function Submit({ isLoading, handleSubmit }: Props) {
  return (
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
  );
}
