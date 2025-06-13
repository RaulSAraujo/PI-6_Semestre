import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  header: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(16),
  },
  welcomeText: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: verticalScale(4),
  },
  headerSubtitle: {
    fontSize: moderateScale(14),
    color: '#666666',
  },
});
