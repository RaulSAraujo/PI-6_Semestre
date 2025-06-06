import { Box, styled } from "@mui/material";

export const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: theme.spacing(2),
  "& img": {
    width: "100px",
    height: "100px",
    borderRadius: 20,
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
}));
