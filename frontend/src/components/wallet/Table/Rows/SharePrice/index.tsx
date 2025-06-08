import { TableCell } from "@mui/material";
import { AttachMoney } from "@mui/icons-material";

import { ValueChip } from "./styles";

type Props = {
  sharePrice: number | string;
};

export function SharePrice({ sharePrice }: Props) {
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
      <ValueChip
        size="small"
        label={formatCurrency(sharePrice)}
        icon={<AttachMoney />}
      />
    </TableCell>
  );
}
