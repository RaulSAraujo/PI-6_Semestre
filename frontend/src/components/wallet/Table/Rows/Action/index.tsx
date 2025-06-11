import { useState } from "react";

import { MoreVert } from "@mui/icons-material";
import { Item } from "@models/investment-portfolio";
import {
  CircularProgress,
  IconButton,
  TableCell,
  Tooltip,
} from "@mui/material";

import { Menu } from "./Menu";

type Props = {
  row: Item;
};

export function ActionRow({ row }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableCell>
      <Tooltip title="Mais opções">
        {isLoading ? (
          <CircularProgress size={20} />
        ) : (
          <IconButton size="small" onClick={handleClick}>
            <MoreVert fontSize="small" />
          </IconButton>
        )}
      </Tooltip>

      <Menu
        row={row}
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        setIsLoading={setIsLoading}
      />
    </TableCell>
  );
}
