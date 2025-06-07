import { Box, Tooltip, Typography } from "@mui/material";
import { Add, Category, Refresh } from "@mui/icons-material";

import { UserSearch } from "./Search";
import { ActionButton } from "./styles";

interface Props {
  searchTerm: string;
  onRefresh: () => void;
  onSearchChange: (value: string) => void;
}

export function Header({ searchTerm, onSearchChange, onRefresh }: Props) {
  return (
    <Box
      mb={3}
      pt={1}
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
        <Category sx={{ mr: 1 }} />
        Perfis de Investimento
      </Typography>

      <Box display="flex" gap={2}>
        <UserSearch value={searchTerm} onChange={onSearchChange} />

        <Tooltip title="Atualizar">
          <ActionButton onClick={onRefresh}>
            <Refresh />
          </ActionButton>
        </Tooltip>

        <Tooltip title="Adicionar perfil">
          <ActionButton color="primary">
            <Add />
          </ActionButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
