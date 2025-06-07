import { Box, Tooltip, Typography } from "@mui/material";
import { Add, PersonOutline, Refresh } from "@mui/icons-material";

import { ActionButton, AddButton } from "./styles";

type Props = {
  onAdd: () => void;
  onRefresh: () => void;
};

export function Header({ onRefresh, onAdd }: Props) {
  return (
    <Box
      mb={3}
      gap={2}
      display="flex"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography
        variant="h5"
        component="h2"
        color="primary"
        fontWeight="700"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <PersonOutline sx={{ mr: 1 }} />
        Gerenciamento de Clientes
      </Typography>

      <Box display="flex" gap={2}>
        <Tooltip title="Atualizar">
          <ActionButton onClick={onRefresh}>
            <Refresh />
          </ActionButton>
        </Tooltip>

        <AddButton
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={onAdd}
        >
          Novo Cliente
        </AddButton>
      </Box>
    </Box>
  );
}
