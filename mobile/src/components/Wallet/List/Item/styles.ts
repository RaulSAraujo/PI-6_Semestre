import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
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
