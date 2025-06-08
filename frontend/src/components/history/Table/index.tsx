import { TableCell } from "@mui/material";
import { Table as TableUi } from "@components/ui";
import { PersonOutline, ShowChart } from "@mui/icons-material";
import { Item } from "@models/listed-share-history";

import {
  ActionRow,
  CurrencyChipRow,
  VolumeChipRow,
  PercentageChipRow,
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

  const formatCurrency = (value: number | string) => {
    if (value === null || value === undefined) return "R$ 0,00";

    const numValue =
      typeof value === "number"
        ? value
        : parseFloat(String(value).replace(/[^\d.-]/g, ""));

    if (isNaN(numValue)) return "R$ 0,00";

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numValue);
  };

  const formatPercentage = (value: number | string) => {
    if (value === null || value === undefined) return "0,00%";

    const numValue =
      typeof value === "number"
        ? value
        : parseFloat(String(value).replace(/[^\d.-]/g, ""));

    if (isNaN(numValue)) return "0,00%";

    return new Intl.NumberFormat("pt-BR", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numValue / 100);
  };

  const formatVolume = (value: number | string) => {
    if (value === null || value === undefined) return "0";

    const numValue =
      typeof value === "number"
        ? value
        : parseFloat(String(value).replace(/[^\d.-]/g, ""));

    if (isNaN(numValue)) return "0";

    return new Intl.NumberFormat("pt-BR").format(numValue);
  };

  return (
    <TableUi
      page={page}
      items={items}
      isLoading={isLoading}
      emptyStateColSpan={4}
      totalItems={totalItems}
      onPageChange={onPageChange}
      ariaLabel="Lista de clientes"
      titleEmpty="Nenhum histórico encontrado."
      subtitleEmpty="Clique em criar para adicionar um histórico."
      iconEmpty={<PersonOutline sx={{ fontSize: 48, opacity: 0.5, mb: 2 }} />}
      headers={
        <>
          <TableCell>Ações</TableCell>
          <TableCell>Variação</TableCell>
          <TableCell>Volume</TableCell>
          <TableCell>Abertura</TableCell>
          <TableCell>Mínima</TableCell>
          <TableCell>Máxima</TableCell>
          <TableCell>Último Valor</TableCell>
        </>
      }
      renderRow={(row) => {
        return (
          <>
            <ActionRow />

            <PercentageChipRow
              label={formatPercentage(row.percentage_change)}
              value={row.percentage_change}
            />

            <VolumeChipRow value={formatVolume(row.trading_volume)} />

            <CurrencyChipRow
              value={formatCurrency(row.opening)}
              color="primary"
            />

            <CurrencyChipRow value={formatCurrency(row.low)} color="primary" />

            <CurrencyChipRow value={formatCurrency(row.high)} color="primary" />

            <CurrencyChipRow
              icon={<ShowChart />}
              color="primary"
              value={formatCurrency(row.last_value)}
            />
          </>
        );
      }}
    />
  );
}
