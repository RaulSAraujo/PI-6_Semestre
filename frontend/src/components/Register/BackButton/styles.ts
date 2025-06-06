import { Button, styled, alpha } from "@mui/material";

export const BackButtonStyled = styled(Button)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  left: theme.spacing(2),
  borderRadius: 12,
  padding: theme.spacing(1),
  minWidth: "auto",
  backgroundColor: alpha(theme.palette.background.paper, 0.7),
  color: theme.palette.text.primary,
  backdropFilter: "blur(5px)",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  zIndex: 10,
  "&:hover": {
    backgroundColor: alpha(theme.palette.background.paper, 0.9),
  },
}));
