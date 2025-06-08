import { Chip, alpha, styled } from "@mui/material";

export const ValueChip = styled(Chip)(({ theme }) => ({
  borderRadius: 8,
  fontWeight: 700,
  backgroundColor: alpha(theme.palette.success.main, 0.1),
  color: theme.palette.success.main,
  border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
  "& .MuiChip-icon": {
    color: theme.palette.success.main,
  },
}));
