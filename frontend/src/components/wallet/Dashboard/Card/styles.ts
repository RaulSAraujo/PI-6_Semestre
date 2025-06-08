import { Box, Card, alpha, styled } from "@mui/material";

export const StatCard = styled(Card)(({ theme }) => ({
  height: "150px",
  borderRadius: 16,
  padding: theme.spacing(2),
  boxShadow:
    theme.palette.mode === "dark"
      ? `0 4px 14px ${alpha(theme.palette.common.black, 0.2)}`
      : `0 4px 14px ${alpha(theme.palette.common.black, 0.1)}`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

export const IconContainer = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(1),
  color: theme.palette.primary.main,
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.02)}`,
}));
