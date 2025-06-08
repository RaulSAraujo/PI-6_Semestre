import { Box, Tooltip, Typography } from "@mui/material";
import { Add, Refresh } from "@mui/icons-material";

import { ActionButton, AddButton } from "./styles";

interface Props {
  title: string;
  buttonTitle: string;
  icon: React.ReactNode;
  onAdd: () => void;
  onRefresh: () => void;
}

export function Toolbar({ title,buttonTitle, icon, onAdd, onRefresh }: Props) {
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
        {icon}

        {title}
      </Typography>

      <Box display="flex" gap={2}>
        <Tooltip title="Atualizar">
          <ActionButton onClick={onRefresh}>
            <Refresh />
          </ActionButton>
        </Tooltip>

        <Tooltip title="Adicionar perfil">
          <AddButton
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={onAdd}
          >
            {buttonTitle}
          </AddButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
