import { TableCell } from "@mui/material";
import { Item } from "@models/listed-shares";
import { ShowChart } from "@mui/icons-material";
import { Table as TableUi } from "@components/ui";

import { TickerRow, BusinessRow, ClassificationRow } from "./Rows";

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
      emptyStateColSpan={3}
      totalItems={totalItems}
      onPageChange={onPageChange}
      ariaLabel="Lista de clientes"
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
