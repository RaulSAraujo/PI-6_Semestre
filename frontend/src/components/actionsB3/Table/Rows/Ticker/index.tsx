import { TableCell } from "@mui/material";
import { TrendingUp } from "@mui/icons-material";

import { TickerChip } from "./styles";

type Props = {
  ticker: string;
};

export function TickerRow({ ticker }: Props) {
  return (
    <TableCell>
      <TickerChip size="small" label={ticker} icon={<TrendingUp />} />
    </TableCell>
  );
}
