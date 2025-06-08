import { Chip, alpha, styled } from "@mui/material";

export const QuantityChip = styled(Chip)(({ theme }) => ({
  borderRadius: 8,
  fontWeight: 600,
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  "& .MuiChip-icon": {
    color: theme.palette.primary.main,
  },
}));
