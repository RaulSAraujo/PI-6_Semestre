export const formatCurrency = (value: string | number): string => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(numValue);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('pt-BR').format(value);
};

export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('pt-BR');
};

export const calculateInvestmentMetrics = (item: Item) => {
  const sharePrice = parseFloat(item.share_price);
  const investedAmount = parseFloat(item.invested_amount);
  const currentValue = sharePrice * item.quantity_purchased;
  const profit = currentValue - investedAmount;
  const profitPercentage = (profit / investedAmount) * 100;
  const isProfit = profit >= 0;

  return {
    sharePrice,
    investedAmount,
    currentValue,
    profit,
    profitPercentage,
    isProfit,
  };
};
