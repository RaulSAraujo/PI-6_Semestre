import { View } from 'react-native';

import { formatMoney } from '@utils/Formatters';
import { InvestmentSummary } from '@dtos/InvestmentDTO';

import { styles } from './styles';
import { SummaryCard } from './Shared';

interface Props {
  summary: InvestmentSummary;
}

export function SummaryCards({ summary }: Props) {
  return (
    <View style={styles.summaryContainer}>
      <SummaryCard
        title="Total Investido"
        value={formatMoney(summary.totalInvested)}
        icon="attach-money"
        iconType="material"
        color="#FF9800"
        backgroundColor="#FFF3E0"
      />

      <SummaryCard
        title="Valor Atual"
        value={formatMoney(summary.totalCurrentValue)}
        icon="diamond"
        iconType="material"
        color="#2196F3"
        backgroundColor="#E3F2FD"
      />

      <SummaryCard
        title="Lucro/Prejuízo"
        value={formatMoney(summary.totalProfit)}
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
}
