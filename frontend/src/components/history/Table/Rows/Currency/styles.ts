import { Chip, alpha, styled } from "@mui/material";

export const ValueChip = styled(Chip)(({ theme, color }) => ({
  borderRadius: 8,
  fontWeight: 600,
  backgroundColor:
    color === "default"
      ? alpha(theme.palette.success.main, 0.1)
      : color === "error"
      ? alpha(theme.palette.error.main, 0.1)
      : alpha(theme.palette.primary.main, 0.1),
  color:
    color === "default"
      ? theme.palette.success.main
      : color === "error"
      ? theme.palette.error.main
      : theme.palette.primary.main,
  border: `1px solid ${
    color === "default"
      ? alpha(theme.palette.success.main, 0.2)
      : color === "error"
      ? alpha(theme.palette.error.main, 0.2)
      : alpha(theme.palette.primary.main, 0.2)
  }`,
  "& .MuiChip-icon": {
    color:
      color === "default"
        ? theme.palette.success.main
        : color === "error"
        ? theme.palette.error.main
        : theme.palette.primary.main,
  },
}));
