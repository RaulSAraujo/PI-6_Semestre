import React from 'react';

import { FlatList, StyleSheet, Text, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import { Icon } from '@rneui/themed';

import { InvestmentItem } from './InvestmentItem';
import { InvestmentSummary, Item } from '../Shared/types';

interface InvestmentsListProps {
  items: Item[];
  summary: InvestmentSummary;
}

export const InvestmentsList: React.FC<InvestmentsListProps> = ({ items, summary }) => {
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
};

const styles = StyleSheet.create({
  investmentsSection: {
    paddingHorizontal: scale(20),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  sectionTitle: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: '#1A1A1A',
  },
  profitSummary: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profitSummaryText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    marginLeft: scale(4),
  },
});
