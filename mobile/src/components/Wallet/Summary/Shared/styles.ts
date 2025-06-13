import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
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
