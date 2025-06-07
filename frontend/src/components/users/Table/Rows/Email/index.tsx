import { TableCell } from "@mui/material";

type Props = {
  email: string;
};
export function EmailRow({ email }: Props) {
  return <TableCell>{email}</TableCell>;
}
