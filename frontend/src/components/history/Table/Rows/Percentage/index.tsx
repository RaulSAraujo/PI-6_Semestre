import { TableCell, useTheme } from "@mui/material";

import { PercentageChip } from "./styles";
import { ArrowDownward, ArrowUpward, TrendingDown } from "@mui/icons-material";

type Props = {
  label: string;
  value: number | string;
};

export function PercentageChipRow({ value, label }: Props) {
  const percentChange =
    typeof value === "number"
      ? value
      : parseFloat(String(value).replace(/[^\d.-]/g, ""));

  const isPositive = !isNaN(percentChange) && percentChange > 0;
  const isNegative = !isNaN(percentChange) && percentChange < 0;

  return (
    <TableCell>
      <PercentageChip
        size="small"
        label={label}
        color={isPositive ? "default" : isNegative ? "error" : "default"}
        icon={
          isPositive ? (
            <ArrowUpward />
          ) : isNegative ? (
            <ArrowDownward />
          ) : (
            <TrendingDown />
          )
        }
      />
    </TableCell>
  );
}
