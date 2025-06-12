import React, { useMemo } from 'react';

import { ScrollView, StyleSheet } from 'react-native';

import { DashboardHeader } from './Header';
import { SummaryCards } from './SummaryCards';
import { InvestmentsList } from './InvestmentsList';
import { DashboardProps, InvestmentSummary } from '../Shared/types';

export const InvestmentDashboard: React.FC<DashboardProps> = ({ items, userName }) => {
  const summary: InvestmentSummary = useMemo(() => {
    const totalInvested = items.reduce((sum, item) => sum + parseFloat(item.invested_amount), 0);
    const totalCurrentValue = items.reduce(
      (sum, item) => sum + parseFloat(item.share_price) * item.quantity_purchased,
      0
    );
    const totalProfit = totalCurrentValue - totalInvested;
    const totalAssets = items.length;
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity_purchased, 0);

    return {
      totalInvested,
      totalCurrentValue,
      totalProfit,
      totalAssets,
      totalQuantity,
      profitPercentage: totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0,
    };
  }, [items]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <DashboardHeader userName={userName} />
      <SummaryCards summary={summary} />
      <InvestmentsList items={items} summary={summary} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
});
