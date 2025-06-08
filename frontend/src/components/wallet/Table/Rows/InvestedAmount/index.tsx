import { MonetizationOn } from "@mui/icons-material";
import { alpha, Box, TableCell, Typography, useTheme } from "@mui/material";

type Props = {
  investedAmount: number | string;
};

export function InvestedAmount({ investedAmount }: Props) {
  const theme = useTheme();

  const formatCurrency = (value: number | string) => {
    if (value === null || value === undefined) return "R$ 0,00";

    const numValue =
      typeof value === "number"
        ? value
        : parseFloat(String(value).replace(/[^\d.-]/g, ""));

    if (isNaN(numValue)) return "R$ 0,00";

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numValue);
  };

  return (
    <TableCell>
      <Box display="flex" alignItems="center">
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            backgroundColor: alpha(theme.palette.success.main, 0.1),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mr: 2,
            color: theme.palette.success.main,
            fontWeight: "bold",
          }}
        >
          <MonetizationOn />
        </Box>

        <Typography variant="body1" fontWeight="600" color="success.main">
          {formatCurrency(investedAmount)}
        </Typography>
      </Box>
    </TableCell>
  );
}
