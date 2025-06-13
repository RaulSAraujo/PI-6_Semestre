import React, { useMemo, useState } from 'react';

import { RefreshControl, ScrollView } from 'react-native';

import { InvestmentSummary, Item } from '@dtos/InvestmentDTO';

import { styles } from './styles';
import { SummaryCards } from './Summary';
import { InvestmentsList } from './List';
import { DashboardHeader } from './Header';

export interface Props {
  items: Item[];
  userName?: string;
  refreshing: boolean;
  onRefresh: () => void;
}

export function Dashboard({ items, userName, onRefresh, refreshing }: Props) {
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
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          onRefresh={onRefresh}
          refreshing={refreshing}
          tintColor={'#ff0000'}
          title={'Atualizando...'}
          titleColor={'#ff0000'}
          progressBackgroundColor={'#ffffff'}
          colors={['#ff0000', '#00ff00', '#0000ff']}
        />
      }>
      <DashboardHeader userName={userName} />

      <SummaryCards summary={summary} />

      <InvestmentsList items={items} summary={summary} />
    </ScrollView>
  );
}
