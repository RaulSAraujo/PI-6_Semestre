import { Card, CardHeader, alpha, styled } from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  overflow: "hidden",
  boxShadow:
    theme.palette.mode === "dark"
      ? `0 6px 20px ${alpha(theme.palette.common.black, 0.2)}`
      : `0 6px 20px ${alpha(theme.palette.common.black, 0.05)}`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.05)}`,
}));

export const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  background:
    theme.palette.mode === "dark"
      ? `linear-gradient(90deg, ${alpha(
          theme.palette.primary.dark,
          0.3
        )} 0%, ${alpha(theme.palette.secondary.dark, 0.3)} 100%)`
      : `linear-gradient(90deg, ${alpha(
          theme.palette.primary.light,
          0.2
        )} 0%, ${alpha(theme.palette.secondary.light, 0.2)} 100%)`,
  padding: theme.spacing(2, 3),
}));
