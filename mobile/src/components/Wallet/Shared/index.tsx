import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Icon } from '@rneui/themed';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

interface SummaryCardProps {
  title: string;
  value: string;
  icon: string;
  iconType: string;
  color: string;
  backgroundColor: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon,
  iconType,
  color,
  backgroundColor,
}) => (
  <Card containerStyle={styles.summaryCard}>
    <View style={styles.cardContent}>
      <View style={[styles.iconContainer, { backgroundColor }]}>
        <Icon name={icon} type={iconType} size={moderateScale(20)} color={color} />
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardValue}>{value}</Text>
      </View>
    </View>
  </Card>
);

const styles = StyleSheet.create({
  summaryCard: {
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(12),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(12),
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: moderateScale(12),
    color: '#666666',
    marginBottom: verticalScale(2),
  },
  cardValue: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#1A1A1A',
  },
});
