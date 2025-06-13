export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('pt-BR').format(value);
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
