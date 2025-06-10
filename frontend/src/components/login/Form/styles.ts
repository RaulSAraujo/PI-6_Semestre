import { Paper, styled, alpha } from "@mui/material";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  padding: theme.spacing(4),
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(8px)",
  background: alpha(theme.palette.background.paper, 0.85),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));
