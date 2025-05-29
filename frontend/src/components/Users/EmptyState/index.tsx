import { Typography } from "@mui/material";
import { PersonOutline } from "@mui/icons-material";

import { EmptyState } from "./styles";
import { Environment } from "../../../environment";

export const UserEmptyState: React.FC = () => {
  return (
    <EmptyState>
      <PersonOutline sx={{ fontSize: 48, opacity: 0.5, mb: 2 }} />
      <Typography variant="subtitle1" gutterBottom>
        {Environment.LISTAGEM_VAZIA}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Tente ajustar os filtros ou adicionar novos usuários
      </Typography>
    </EmptyState>
  );
};
