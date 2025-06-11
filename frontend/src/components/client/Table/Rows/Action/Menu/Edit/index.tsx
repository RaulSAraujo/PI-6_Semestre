import { useNavigate } from "react-router-dom";

import { Item } from "@models/client";
import { MenuItem } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";

type Props = {
  row: Item;
};

export function Edit({ row }: Props) {
  const navigate = useNavigate();

  return (
    <MenuItem onClick={() => navigate(`/clientes/${row.id}`)}>
      <EditIcon sx={{ mr: 1 }} /> Editar
    </MenuItem>
  );
}
