import { Chip } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

export const SectorChip = styled(Chip)(({ theme }) => ({
  borderRadius: 8,
  fontWeight: 500,
  backgroundColor: alpha(theme.palette.secondary.main, 0.1),
  color: theme.palette.secondary.main,
  border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
  "& .MuiChip-icon": {
    color: theme.palette.secondary.main,
  },
}));
