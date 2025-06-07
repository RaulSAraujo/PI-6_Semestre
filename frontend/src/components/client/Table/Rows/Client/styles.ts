import { alpha, styled, Avatar } from "@mui/material";

export const ClientAvatar = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  fontWeight: 600,
  border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
}));
