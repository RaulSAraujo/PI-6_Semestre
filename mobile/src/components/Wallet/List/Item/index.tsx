import { Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

import useDate from '@hooks/useDate';
import { Card, Icon } from '@rneui/themed';
import { Item } from '@dtos/InvestmentDTO';
import { formatMoney } from '@utils/Formatters';

import { styles } from './styles';
import { calculateInvestmentMetrics, formatNumber } from './formatters';

interface Props {
  item: Item;
}

export function InvestmentItem({ item }: Props) {
  const { formatDate } = useDate();

  const metrics = calculateInvestmentMetrics(item);

  return (
    <Card containerStyle={styles.investmentCard}>
      <View style={styles.investmentHeader}>
        <View style={styles.investmentInfo}>
          <Text style={styles.shareCode}>{`Usuário: #${item.id_client}`}</Text>
          <Text style={styles.investmentDate}>{formatDate(item.created_at)}</Text>
        </View>

        <View style={styles.profitContainer}>
          <Text style={[styles.profitValue, { color: metrics.isProfit ? '#4CAF50' : '#F44336' }]}>
            {formatMoney(metrics.profit)}
          </Text>

          <View
            style={[
              styles.profitBadge,
              { backgroundColor: metrics.isProfit ? '#E8F5E8' : '#FFEBEE' },
            ]}>
            <Icon
              name={metrics.isProfit ? 'trending-up' : 'trending-down'}
              type="material"
              size={moderateScale(12)}
              color={metrics.isProfit ? '#4CAF50' : '#F44336'}
            />
            <Text
              style={[
                styles.profitPercentage,
                { color: metrics.isProfit ? '#4CAF50' : '#F44336' },
              ]}>
              {metrics.profitPercentage.toFixed(2)}%
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.investmentDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Preço da Ação</Text>
          <Text style={styles.detailValue}>{formatMoney(metrics.sharePrice)}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Quantidade</Text>
          <Text style={styles.detailValue}>{formatNumber(item.quantity_purchased)}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Investido</Text>
          <Text style={styles.detailValue}>{formatMoney(metrics.investedAmount)}</Text>
        </View>
      </View>
    </Card>
  );
}
