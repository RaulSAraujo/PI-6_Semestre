import { TableCell } from "@mui/material";

import { VolumeChip } from "./styles";

type Props = {
  value: number | string;
  icon?: React.ReactElement;
};

export function VolumeChipRow({ icon, value }: Props) {
  return (
    <TableCell>
      <VolumeChip size="small" icon={icon} label={value} />
    </TableCell>
  );
}
