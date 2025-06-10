import { TableCell } from "@mui/material";
import { Close, Check } from "@mui/icons-material";

type Props = {
  isAdmin: boolean;
};
export function AdminRow({ isAdmin }: Props) {
  return (
    <TableCell align="center">
      {isAdmin ? <Check color="success" /> : <Close color="error" />}
    </TableCell>
  );
}
