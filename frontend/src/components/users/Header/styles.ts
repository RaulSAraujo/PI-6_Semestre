import { IconButton } from "@mui/material";
import { alpha, styled } from "@mui/material";

export const ActionButton = styled(IconButton)(({ theme }) => ({
  borderRadius: 12,
  padding: theme.spacing(1),
  transition: "all 0.2s ease",
  backgroundColor:
    theme.palette.mode === "dark"
      ? alpha(theme.palette.background.paper, 0.5)
      : alpha(theme.palette.background.paper, 0.8),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    transform: "translateY(-2px)",
  },
}));
