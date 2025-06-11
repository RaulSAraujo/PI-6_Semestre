import { TableCell } from "@mui/material";
import { Item } from "@models/listed-shares";
import { ShowChart } from "@mui/icons-material";
import { Table as TableUi } from "@components/ui";

import { TickerRow, BusinessRow, ClassificationRow } from "./Rows";
import { useTableContext } from "@contexts/TableContext";

export function Table() {
  const { page, items, isLoading, totalItems, setPage } = useTableContext();

  return (
    <TableUi
      page={page}
      isLoading={isLoading}
      emptyStateColSpan={3}
      totalItems={totalItems}
      items={items as Item[]}
      ariaLabel="Lista de clientes"
      onPageChange={(page: number) => setPage(page)}
      iconEmpty={<ShowChart sx={{ fontSize: 48, opacity: 0.5, mb: 2 }} />}
      headers={
        <>
          <TableCell>Ticker</TableCell>
          <TableCell>Nome da Empresa</TableCell>
          <TableCell>Setor B3</TableCell>
        </>
      }
      renderRow={(row) => {
        return (
          <>
            <TickerRow ticker={row.ticker} />

            <BusinessRow name={row.name} />

            <ClassificationRow classification={row.b3_sector_classification} />
          </>
        );
      }}
    />
  );
}
