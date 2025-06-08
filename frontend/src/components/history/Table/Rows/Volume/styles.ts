import { Chip, alpha, styled } from "@mui/material";

export const VolumeChip = styled(Chip)(({ theme }) => ({
  borderRadius: 8,
  fontWeight: 600,
  backgroundColor: alpha(theme.palette.secondary.main, 0.1),
  color: theme.palette.secondary.main,
  border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
  "& .MuiChip-icon": {
    color: theme.palette.secondary.main,
  },
}));
