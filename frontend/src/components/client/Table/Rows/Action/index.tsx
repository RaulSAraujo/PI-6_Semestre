import { MoreVert } from "@mui/icons-material";
import { IconButton, TableCell, Tooltip } from "@mui/material";

export function ActionRow() {
  return (
    <TableCell align="right">
      <Tooltip title="Mais opções">
        <IconButton size="small">
          <MoreVert fontSize="small" />
        </IconButton>
      </Tooltip>
    </TableCell>
  );
}
