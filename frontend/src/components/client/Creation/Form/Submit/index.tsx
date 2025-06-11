import { Box, Button } from "@mui/material";

type Props = {
    isLoading: boolean;
};

export function Submit({ isLoading }: Props) {
  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <Button
        size="large"
        type="submit"
        color="primary"
        variant="contained"
        disabled={isLoading}
        sx={{ width: "250px", color: "white" }}
      >
        {isLoading ? "Salvando..." : "Salvar"}
      </Button>
    </Box>
  );
}
