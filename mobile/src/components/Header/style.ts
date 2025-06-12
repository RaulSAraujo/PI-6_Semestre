import { StyleSheet } from 'react-native';

import { moderateScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    zIndex: 100,
  },
  title: {
    color: 'grey',
    marginBottom: -8,
    fontSize: moderateScale(15),
  },
  subtitle: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: moderateScale(20),
  },
});
