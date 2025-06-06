import { Typography } from "@mui/material";
import { PersonOutline } from "@mui/icons-material";

import { EmptyBox } from "./styles";

export function EmptyState() {
  return (
    <EmptyBox>
      <PersonOutline sx={{ fontSize: 48, opacity: 0.5, mb: 2 }} />
      <Typography variant="subtitle1" gutterBottom>
        Nenhum registro encontrado.
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Tente ajustar os filtros ou adicionar novos usuários
      </Typography>
    </EmptyBox>
  );
}
