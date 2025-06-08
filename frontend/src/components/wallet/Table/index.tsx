import { TableCell } from "@mui/material";
import { Table as TableUi } from "@components/ui";
import { PersonOutline } from "@mui/icons-material";
import { Item } from "@models/investment-portfolio";

import {
  ActionRow,
  SharePrice,
  InvestedAmount,
  QuantityPurchase,
} from "./Rows";

type Props = {
  page: number;
  items: Item[];
  totalItems: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
};

export function Table(props: Props) {
  const { items, isLoading, page, totalItems, onPageChange } = props;

  return (
    <TableUi
      page={page}
      items={items}
      isLoading={isLoading}
      emptyStateColSpan={4}
      totalItems={totalItems}
      onPageChange={onPageChange}
      ariaLabel="Lista de clientes"
      iconEmpty={<PersonOutline sx={{ fontSize: 48, opacity: 0.5, mb: 2 }} />}
      titleEmpty="Nenhum cliente encontrado."
      subtitleEmpty="Clique em criar para adicionar um novo cliente."
      headers={
        <>
          <TableCell>Ações</TableCell>
          <TableCell>Preço da Ação</TableCell>
          <TableCell>Quantidade Comprada</TableCell>
          <TableCell>Valor Investido</TableCell>
        </>
      }
      renderRow={(row) => {
        return (
          <>
            <ActionRow />

            <SharePrice sharePrice={row.share_price} />

            <QuantityPurchase quantityPurchased={row.quantity_purchased} />

            <InvestedAmount investedAmount={row.invested_amount} />
          </>
        );
      }}
    />
  );
}
