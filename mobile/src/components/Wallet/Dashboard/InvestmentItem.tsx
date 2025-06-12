import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import { Avatar, Card, Icon } from '@rneui/themed';

import { Item } from '../Shared/types';
import {
  calculateInvestmentMetrics,
  formatCurrency,
  formatDate,
  formatNumber,
} from '../utils/formatters';

interface InvestmentItemProps {
  item: Item;
  shareCode?: string;
}

export const InvestmentItem: React.FC<InvestmentItemProps> = ({ item, shareCode }) => {
  const metrics = calculateInvestmentMetrics(item);

  return (
    <Card containerStyle={styles.investmentCard}>
      <View style={styles.investmentHeader}>
        <View style={styles.investmentInfo}>
          <Text style={styles.shareCode}>{shareCode || `Ação #${item.id_listed_shares}`}</Text>
          <Text style={styles.investmentDate}>{formatDate(item.created_at)}</Text>
        </View>

        <View style={styles.profitContainer}>
          <Text style={[styles.profitValue, { color: metrics.isProfit ? '#4CAF50' : '#F44336' }]}>
            {formatCurrency(metrics.profit)}
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
          <Text style={styles.detailValue}>{formatCurrency(metrics.sharePrice)}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Quantidade</Text>
          <Text style={styles.detailValue}>{formatNumber(item.quantity_purchased)}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Investido</Text>
          <Text style={styles.detailValue}>{formatCurrency(metrics.investedAmount)}</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  investmentCard: {
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(12),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  investmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  shareAvatar: {
    backgroundColor: '#6C63FF',
    marginRight: scale(12),
  },
  shareAvatarTitle: {
    fontSize: moderateScale(10),
    fontWeight: '600',
  },
  investmentInfo: {
    flex: 1,
  },
  shareCode: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#1A1A1A',
  },
  investmentDate: {
    fontSize: moderateScale(12),
    color: '#666666',
    marginTop: verticalScale(2),
  },
  profitContainer: {
    alignItems: 'flex-end',
  },
  profitValue: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    marginBottom: verticalScale(4),
  },
  profitBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(2),
    borderRadius: moderateScale(12),
  },
  profitPercentage: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    marginLeft: scale(4),
  },
  investmentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: verticalScale(12),
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E0E0E0',
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    fontSize: moderateScale(10),
    color: '#666666',
    marginBottom: verticalScale(2),
    textAlign: 'center',
  },
  detailValue: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
  },
});
