import { styled, alpha, Card } from "@mui/material";

export const SummaryCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  padding: theme.spacing(2),
  backgroundColor: alpha(theme.palette.success.main, 0.05),
  border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`,
  boxShadow: `0 4px 14px ${alpha(theme.palette.common.black, 0.05)}`,
}));
