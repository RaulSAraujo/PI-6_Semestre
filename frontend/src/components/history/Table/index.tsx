import { useEffect, useState } from "react";

import { TableCell } from "@mui/material";
import { Table as TableUi } from "@components/ui";
import { Item } from "@models/listed-share-history";
import { ActionB3Service } from "@services/api/action";
import { useTableContext } from "@contexts/TableContext";
import { Item as ItemShares } from "@models/listed-shares";
import { PersonOutline, ShowChart } from "@mui/icons-material";

import {
  CurrencyChipRow,
  PercentageChipRow,
  VolumeChipRow,
  BusinessRow,
} from "./Rows";

export function Table() {
  const { page, items, isLoading, totalItems, setPage } = useTableContext();

  const [isLoadingShares, setIsLoadingShares] = useState(false);

  const [listshares, setListShares] = useState<ItemShares[]>([]);

  const fetchShares = async () => {
    setIsLoadingShares(true);

    try {
      const result = await ActionB3Service.get({});

      setListShares(result.items);
    } catch (error) {
      console.error("Erro ao buscar perfis:", error);
    } finally {
      setIsLoadingShares(false);
    }
  };

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

  useEffect(() => {
    fetchShares();
  }, []);

  return (
    <TableUi
      page={page}
      isLoading={isLoading}
      emptyStateColSpan={7}
      items={items as Item[]}
      totalItems={totalItems}
      ariaLabel="Histórico de ações"
      onPageChange={(page) => setPage(page)}
      titleEmpty="Nenhum histórico encontrado."
      subtitleEmpty="Clique em criar para adicionar um histórico."
      iconEmpty={<PersonOutline sx={{ fontSize: 48, opacity: 0.5, mb: 2 }} />}
      headers={
        <>
          <TableCell>Nome da Empresa</TableCell>
          <TableCell>Abertura</TableCell>
          <TableCell>Mínima</TableCell>
          <TableCell>Máxima</TableCell>
          <TableCell>Último Valor</TableCell>
          <TableCell>Volume</TableCell>
          <TableCell>Variação</TableCell>
        </>
      }
      renderRow={(row) => {
        return (
          <>
            <BusinessRow
              listShares={listshares}
              loading={isLoadingShares}
              idListedShares={row.id_listed_shares}
            />

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

            <VolumeChipRow value={formatVolume(row.trading_volume)} />

            <PercentageChipRow
              label={formatPercentage(row.percentage_change)}
              value={row.percentage_change}
            />
          </>
        );
      }}
    />
  );
}
