import { Button, styled, alpha } from "@mui/material";

export const BackButtonStyled = styled(Button)(({ theme }) => ({
  zIndex: 10,
  minWidth: "auto",
  borderRadius: 12,
  position: "absolute",
  top: theme.spacing(2),
  left: theme.spacing(2),
  padding: theme.spacing(2),
  backdropFilter: "blur(5px)",
  color: theme.palette.text.primary,
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  backgroundColor: alpha(theme.palette.background.paper, 0.7),
  "&:hover": {
    backgroundColor: alpha(theme.palette.background.paper, 0.9),
  },
}));
