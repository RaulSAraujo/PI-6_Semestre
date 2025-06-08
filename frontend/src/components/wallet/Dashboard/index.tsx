import { Grid } from "@mui/material";
import { Item } from "@models/investment-portfolio";
import {
  BarChart,
  Calculate,
  MonetizationOn,
  ShoppingCart,
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

  const calculateStats = () => {
    if (!items || items.length === 0) {
      return {
        totalInvested: 0,
        totalAssets: 0,
        averagePrice: 0,
        totalQuantity: 0,
      };
    }

    const totalInvested = items.reduce((sum, item) => {
      const amount =
        typeof item.invested_amount === "number"
          ? item.invested_amount
          : parseFloat(String(item.invested_amount).replace(/[^\d.-]/g, ""));
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);

    const totalQuantity = items.reduce((sum, item) => {
      const quantity =
        typeof item.quantity_purchased === "number"
          ? item.quantity_purchased
          : parseFloat(String(item.quantity_purchased));
      return sum + (isNaN(quantity) ? 0 : quantity);
    }, 0);

    return {
      totalInvested,
      totalAssets: items.length,
      averagePrice: totalQuantity > 0 ? totalInvested / totalQuantity : 0,
      totalQuantity,
    };
  };

  const stats = calculateStats();

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Card
        icon={<MonetizationOn />}
        title="Total Investido"
        value={formatCurrency(stats.totalInvested)}
      />

      <Card
        icon={<BarChart />}
        title="Total de Ativos"
        value={stats.totalAssets}
      />

      <Card
        icon={<Calculate />}
        title="Preço Médio"
        value={formatCurrency(stats.averagePrice)}
      />

      <Card
        icon={<ShoppingCart />}
        title="Quantidade Total"
        value={stats.totalQuantity}
      />
    </Grid>
  );
}
