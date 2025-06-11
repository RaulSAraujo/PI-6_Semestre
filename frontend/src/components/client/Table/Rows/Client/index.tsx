import { Box, TableCell, Typography } from "@mui/material";

import { ClientAvatar } from "./styles";

type Props = {
  id: number;
  name: string;
};

export function ClientRow({ id, name }: Props) {
  return (
    <TableCell component="th" scope="row">
      <Box display="flex" alignItems="center">
        <ClientAvatar>{name?.charAt(0).toUpperCase()}</ClientAvatar>

        <Box ml={2}>
          <Typography variant="body1" fontWeight="500">
            {name}
          </Typography>

          <Typography variant="caption" color="textSecondary">
            ID: {`${id}`}
          </Typography>
        </Box>
      </Box>
    </TableCell>
  );
}
