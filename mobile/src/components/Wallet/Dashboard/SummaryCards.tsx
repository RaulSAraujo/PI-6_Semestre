import React from 'react';

import { StyleSheet, View } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

import { SummaryCard } from '../Shared';
import { InvestmentSummary } from '../Shared/types';
import { formatCurrency } from '../utils/formatters';

interface SummaryCardsProps {
  summary: InvestmentSummary;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ summary }) => (
  <View style={styles.summaryContainer}>
    <SummaryCard
      title="Total Investido"
      value={formatCurrency(summary.totalInvested)}
      icon="attach-money"
      iconType="material"
      color="#FF9800"
      backgroundColor="#FFF3E0"
    />

    <SummaryCard
      title="Valor Atual"
      value={formatCurrency(summary.totalCurrentValue)}
      icon="diamond"
      iconType="material"
      color="#2196F3"
      backgroundColor="#E3F2FD"
    />

    <SummaryCard
      title="Lucro/Prejuízo"
      value={formatCurrency(summary.totalProfit)}
      icon={summary.totalProfit >= 0 ? 'trending-up' : 'trending-down'}
      iconType="material"
      color={summary.totalProfit >= 0 ? '#4CAF50' : '#F44336'}
      backgroundColor={summary.totalProfit >= 0 ? '#E8F5E8' : '#FFEBEE'}
    />

    <SummaryCard
      title="Total de Ativos"
      value={summary.totalAssets.toString()}
      icon="bar-chart"
      iconType="material"
      color="#9C27B0"
      backgroundColor="#F3E5F5"
    />
  </View>
);

const styles = StyleSheet.create({
  summaryContainer: {
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(20),
  },
});
