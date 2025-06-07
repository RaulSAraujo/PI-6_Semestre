import { TableCell } from "@mui/material";
import { Business, Person } from "@mui/icons-material";

import { TypeChip } from "./styles";

type Props = {
  type: string;
};

export function TypeRow({ type }: Props) {
  return (
    <TableCell>
      <TypeChip
        size="small"
        label={type}
        icon={type === "Pessoa Física" ? <Person /> : <Business />}
      />
    </TableCell>
  );
}
