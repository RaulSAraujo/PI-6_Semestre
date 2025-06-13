import { FlatList, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

import { Icon } from '@rneui/themed';

import { styles } from './styles';
import { InvestmentItem } from './Item';
import { InvestmentSummary, Item } from '@dtos/InvestmentDTO';

interface Props {
  items: Item[];
  summary: InvestmentSummary;
}

export function InvestmentsList({ items, summary }: Props) {
  const renderInvestmentItem = ({ item }: { item: Item }) => (
    <InvestmentItem item={item} shareCode={`AÇÃO${item.id_listed_shares}`} />
  );

  return (
    <View style={styles.investmentsSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Meus Investimentos</Text>
        <View style={styles.profitSummary}>
          <Icon
            name={summary.totalProfit >= 0 ? 'trending-up' : 'trending-down'}
            type="material"
            size={moderateScale(16)}
            color={summary.totalProfit >= 0 ? '#4CAF50' : '#F44336'}
          />
          <Text
            style={[
              styles.profitSummaryText,
              { color: summary.totalProfit >= 0 ? '#4CAF50' : '#F44336' },
            ]}>
            {summary.profitPercentage.toFixed(2)}%
          </Text>
        </View>
      </View>

      <FlatList
        data={items}
        renderItem={renderInvestmentItem}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
