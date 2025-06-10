import { Box, Tooltip, Typography } from "@mui/material";
import { Add, Refresh } from "@mui/icons-material";

import { ActionButton, AddButton } from "./styles";

interface Props {
  title: string;
  onAdd?: () => void;
  buttonTitle: string;
  hiddenAdd?: boolean;
  icon: React.ReactNode;
  onRefresh: () => void;
}

export function Toolbar(props: Props) {
  const {
    title,
    buttonTitle,
    icon,
    hiddenAdd = false,
    onAdd,
    onRefresh,
  } = props;

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

        {!hiddenAdd && (
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
        )}
      </Box>
    </Box>
  );
}
