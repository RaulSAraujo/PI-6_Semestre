import { TableCell, Typography } from "@mui/material";

type Props = {
  document: string;
};

export function DocumentRow({ document }: Props) {
  return (
    <TableCell component="th" scope="row">
      <Typography variant="body1" fontWeight="500">
        {document}
      </Typography>
    </TableCell>
  );
}
