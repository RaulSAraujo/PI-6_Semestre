import { Box, Tooltip, Typography } from "@mui/material";
import { Add, PersonOutline, Refresh } from "@mui/icons-material";

import { ActionButton } from "./styles";
import { UserSearch } from "../Search";

interface UserHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
}

export const UserHeader: React.FC<UserHeaderProps> = ({
  searchTerm,
  onSearchChange,
  onRefresh,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      gap={2}
      mb={3}
    >
      <Typography
        variant="h5"
        component="h2"
        color="primary"
        fontWeight="700"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <PersonOutline sx={{ mr: 1 }} />
        Gerenciamento de Usuários
      </Typography>

      <Box display="flex" gap={2}>
        <UserSearch value={searchTerm} onChange={onSearchChange} />

        <Tooltip title="Atualizar">
          <ActionButton onClick={onRefresh}>
            <Refresh />
          </ActionButton>
        </Tooltip>

        <Tooltip title="Adicionar usuário">
          <ActionButton color="primary">
            <Add />
          </ActionButton>
        </Tooltip>
      </Box>
    </Box>
  );
};
