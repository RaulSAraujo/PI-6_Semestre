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
import { useTableContext } from "@contexts/TableContext";

export function Table() {
  const { page, items, isLoading, totalItems, setPage } = useTableContext();

  return (
    <TableUi
      page={page}
      isLoading={isLoading}
      emptyStateColSpan={4}
      items={items as Item[]}
      totalItems={totalItems}
      ariaLabel="Lista de investimentos"
      titleEmpty="Nenhum cliente encontrado."
      onPageChange={(page: number) => setPage(page)}
      subtitleEmpty="Clique em criar para adicionar um novo cliente."
      iconEmpty={<PersonOutline sx={{ fontSize: 48, opacity: 0.5, mb: 2 }} />}
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
            <ActionRow row={row} />

            <SharePrice sharePrice={row.share_price} />

            <QuantityPurchase quantityPurchased={row.quantity_purchased} />

            <InvestedAmount investedAmount={row.invested_amount} />
          </>
        );
      }}
    />
  );
}
