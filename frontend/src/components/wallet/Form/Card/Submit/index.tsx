import { Save } from "@mui/icons-material";
import { ActionButton } from "./styles";

type Props = {
  isLoading: boolean;
};

export function Submit({ isLoading }: Props) {
  return (
    <ActionButton
      type="submit"
      variant="contained"
      color="primary"
      disabled={isLoading}
      startIcon={<Save />}
      sx={{ width: "250px", color: "white" }}
    >
      {isLoading ? "Salvando..." : "Salvar"}
    </ActionButton>
  );
}
