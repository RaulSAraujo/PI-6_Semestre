import { TableCell } from "@mui/material";

type Props = {
  cpf: string;
};
export function CpfRow({ cpf }: Props) {
  return <TableCell>{cpf}</TableCell>;
}
