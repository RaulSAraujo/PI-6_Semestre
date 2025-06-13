import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  summaryContainer: {
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(20),
  },
});
