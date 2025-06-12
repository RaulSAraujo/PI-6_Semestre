import { makeStyles } from '@rneui/themed';

import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(16),
    backgroundColor: '#FFFFFF',
    minHeight: verticalScale(80),
  },
  bottomDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  avatar: {
    backgroundColor: '#6C63FF',
    marginRight: scale(12),
  },
  avatarTitle: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: verticalScale(8),
  },
  companyInfo: {
    flex: 1,
    marginRight: scale(8),
    color: theme.colors.primary,
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#1A1A1A',
  },
  code: {
    fontSize: moderateScale(12),
    color: '#666666',
    marginTop: verticalScale(2),
  },
  currentPriceContainer: {
    alignItems: 'flex-end',
  },
  currentPrice: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: verticalScale(4),
  },
  variationBadge: {
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(2),
    borderRadius: moderateScale(12),
  },
  variationText: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: '#FFFFFF',
  },
  dataGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dataItem: {
    flex: 1,
    alignItems: 'center',
  },
  dataLabel: {
    fontSize: moderateScale(10),
    color: '#666666',
    marginBottom: verticalScale(2),
    textAlign: 'center',
  },
  dataValue: {
    fontSize: moderateScale(11),
    fontWeight: '500',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  chevronContainer: {
    marginLeft: scale(8),
    justifyContent: 'center',
  },
}));

export default useStyles;
