import { Button, IconButton } from "@mui/material";
import { alpha, styled } from "@mui/material";

export const ActionButton = styled(IconButton)(({ theme }) => ({
  borderRadius: 12,
  border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
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

export const AddButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: theme.spacing(1, 2),
  textTransform: "none",
  fontWeight: 600,
  boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
  },
}));
