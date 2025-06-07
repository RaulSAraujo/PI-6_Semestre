import { TableCell } from "@mui/material";
import { PersonOutline } from "@mui/icons-material";

import { UserChip } from "./styles";

type Props = {
  active: boolean;
};
export function StatusRow({ active }: Props) {
  return (
    <TableCell align="right">
      <UserChip
        size="small"
        label={active ? "Ativo" : "Inativo"}
        icon={<PersonOutline />}
      />
    </TableCell>
  );
}
