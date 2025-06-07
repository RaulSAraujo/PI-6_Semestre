import { TableCell } from "@mui/material";

type Props = {
  isAdmin: boolean;
};
export function AdminRow({ isAdmin }: Props) {
  return <TableCell>{isAdmin ? "Sim" : "Não"}</TableCell>;
}
