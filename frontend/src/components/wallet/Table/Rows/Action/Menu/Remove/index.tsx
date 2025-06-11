import { MenuItem } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Item } from "@models/investment-portfolio";
import { ClientesService } from "@services/api/client";
import { useTableContext } from "@contexts/TableContext";

type Props = {
  row: Item;
  setIsLoading: (isLoading: boolean) => void;
};

export function Remove({ row, setIsLoading }: Props) {
  const { items, setItems, page } = useTableContext();

  const handleRemove = async () => {
    setIsLoading(true);

    try {
      await ClientesService.remove(row.id, page);

      const newItems = items.filter((item) => item.id !== row.id);

      setItems(newItems);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MenuItem onClick={handleRemove}>
      <Delete sx={{ mr: 1 }} /> Deletar
    </MenuItem>
  );
}
