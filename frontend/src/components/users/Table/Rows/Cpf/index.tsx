import { TableCell } from "@mui/material";

type Props = {
  cpf: string;
};
export function CpfRow({ cpf }: Props) {
  return <TableCell sx={{ fontWeight: "500" }}>{cpf}</TableCell>;
}
