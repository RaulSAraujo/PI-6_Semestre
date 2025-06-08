import { TableCell } from "@mui/material";

import { ValueChip } from "./styles";

type Props = {
  value: number | string;
  icon?: React.ReactElement;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
};

export function CurrencyChipRow({ icon, value, color = 'default' }: Props) {
  return (
    <TableCell>
      <ValueChip size="small" color={color} icon={icon} label={value} />
    </TableCell>
  );
}
