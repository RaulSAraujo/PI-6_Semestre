import { Button, styled, alpha } from "@mui/material";

export const SignUpButton = styled(Button)(({ theme }) => ({
  fontWeight: 500,
  borderRadius: 12,
  boxShadow: "none",
  fontSize: "0.9rem",
  textTransform: "none",
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
  },
}));
