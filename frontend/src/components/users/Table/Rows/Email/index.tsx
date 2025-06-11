import { TableCell } from "@mui/material";

type Props = {
  email: string;
};
export function EmailRow({ email }: Props) {
  return <TableCell sx={{ fontWeight: "500" }}>{email}</TableCell>;
}
