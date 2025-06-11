import { Menu as MenuRN } from "@mui/material";
import { Item } from "@models/investment-portfolio";

import { Edit } from "./Edit";
import { Remove } from "./Remove";

type Props = {
  row: Item;
  open: boolean;
  handleClose: () => void;
  anchorEl: null | HTMLElement;
  setIsLoading: (isLoading: boolean) => void;
};

export function Menu(props: Props) {
  const { open, row, anchorEl, handleClose, setIsLoading } = props;

  return (
    <MenuRN
      open={open}
      id="action-menu"
      anchorEl={anchorEl}
      onClose={handleClose}
      onClick={handleClose}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <Edit row={row} />

      <Remove row={row} setIsLoading={setIsLoading} />
    </MenuRN>
  );
}
