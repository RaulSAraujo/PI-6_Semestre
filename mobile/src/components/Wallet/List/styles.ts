import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
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
