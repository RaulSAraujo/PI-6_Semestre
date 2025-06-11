import { Grid } from "@mui/material";
import { Item } from "@models/listed-share-history";
import {
  ArrowDownward,
  ArrowUpward,
  BarChart,
  ShowChart,
  TrendingDown,
} from "@mui/icons-material";

import { Card } from "./Card";

type Props = {
  items: Item[];
};

export function Dashboard({ items }: Props) {
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

  const calculateStats = () => {
    if (!items || items.length === 0) {
      return {
        avgVolume: 0,
        maxHigh: 0,
        minLow: 0,
        avgChange: 0,
      };
    }

    let totalVolume = 0;
    let maxHigh = -Infinity;
    let minLow = Infinity;
    let totalChange = 0;
    let count = 0;

    items.forEach((item) => {
      // Volume de negociação
      const volume =
        typeof item.trading_volume === "number"
          ? item.trading_volume
          : parseFloat(String(item.trading_volume).replace(/[^\d.-]/g, ""));

      if (!isNaN(volume)) {
        totalVolume += volume;
      }

      // Valor máximo
      const high =
        typeof item.high === "number"
          ? item.high
          : parseFloat(String(item.high).replace(/[^\d.-]/g, ""));

      if (!isNaN(high) && high > maxHigh) {
        maxHigh = high;
      }

      // Valor mínimo
      const low =
        typeof item.low === "number"
          ? item.low
          : parseFloat(String(item.low).replace(/[^\d.-]/g, ""));

      if (!isNaN(low) && low < minLow) {
        minLow = low;
      }

      // Alteração percentual
      const change =
        typeof item.percentage_change === "number"
          ? item.percentage_change
          : parseFloat(String(item.percentage_change).replace(/[^\d.-]/g, ""));

      if (!isNaN(change)) {
        totalChange += change;
        count++;
      }
    });

    return {
      avgVolume: totalVolume / items.length,
      maxHigh: maxHigh === -Infinity ? 0 : maxHigh,
      minLow: minLow === Infinity ? 0 : minLow,
      avgChange: count > 0 ? totalChange / count : 0,
    };
  };

  const stats = calculateStats();

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Card
        icon={<ShowChart />}
        title="Maior Alta"
        value={formatCurrency(stats.maxHigh)}
      />

      <Card
        icon={<TrendingDown />}
        title="Menor Baixa"
        value={formatCurrency(stats.minLow)}
      />

      <Card
        icon={<BarChart />}
        title="Volume Médio"
        value={formatVolume(stats.avgVolume)}
      />

      <Card
        icon={stats.avgChange > 0 ? <ArrowUpward /> : <ArrowDownward />}
        title="Variação Média"
        value={formatPercentage(stats.avgChange)}
      />
    </Grid>
  );
}
