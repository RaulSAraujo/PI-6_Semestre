import { TableCell } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";

import { QuantityChip } from "./styles";

type Props = {
  quantityPurchased: number;
};

export function QuantityPurchase({ quantityPurchased }: Props) {
  return (
    <TableCell>
      <QuantityChip
        size="small"
        label={quantityPurchased}
        icon={<ShoppingCart />}
      />
    </TableCell>
  );
}
