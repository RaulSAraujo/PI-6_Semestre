import { Chip, alpha, styled } from "@mui/material";

export const ProfileChip = styled(Chip)(({ theme, color }) => ({
  borderRadius: 8,
  fontWeight: 500,
  backgroundColor:
    color === "primary"
      ? alpha(theme.palette.info.main, 0.1)
      : color === "secondary"
      ? alpha(theme.palette.warning.main, 0.1)
      : alpha(theme.palette.error.main, 0.1),
  color:
    color === "primary"
      ? theme.palette.info.main
      : color === "secondary"
      ? theme.palette.warning.main
      : theme.palette.error.main,
  border: `1px solid ${
    color === "primary"
      ? alpha(theme.palette.info.main, 0.2)
      : color === "secondary"
      ? alpha(theme.palette.warning.main, 0.2)
      : alpha(theme.palette.error.main, 0.2)
  }`,
  "& .MuiChip-icon": {
    color:
      color === "primary"
        ? theme.palette.info.main
        : color === "secondary"
        ? theme.palette.warning.main
        : theme.palette.error.main,
  },
}));
