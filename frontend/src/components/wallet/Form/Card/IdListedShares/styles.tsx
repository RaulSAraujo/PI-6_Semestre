import { styled, Chip, alpha } from "@mui/material";

export const TickerChip = styled(Chip)(({ theme }) => ({
  borderRadius: 8,
  fontWeight: 700,
  backgroundColor: alpha(theme.palette.primary.main, 0.15),
  color: theme.palette.primary.main,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
  "& .MuiChip-icon": {
    color: theme.palette.primary.main,
  },
}));
