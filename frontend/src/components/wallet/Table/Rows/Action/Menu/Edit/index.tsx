import { useNavigate } from "react-router-dom";

import { MenuItem } from "@mui/material";
import { Item } from "@models/investment-portfolio";
import { Edit as EditIcon } from "@mui/icons-material";

type Props = {
  row: Item;
};

export function Edit({ row }: Props) {
  const navigate = useNavigate();

  return (
    <MenuItem onClick={() => navigate(`/carteira/${row.id}`)}>
      <EditIcon sx={{ mr: 1 }} /> Editar
    </MenuItem>
  );
}
