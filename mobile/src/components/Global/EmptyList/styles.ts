import { StyleSheet } from 'react-native';

import { moderateScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    color: '#666',
    marginTop: 15,
    textAlign: 'center',
    fontSize: moderateScale(20),
  },
  containerButton: {
    width: 150,
    marginTop: 20,
  },
  button: {
    borderRadius: 20,
  },
  icon: {
    marginLeft: 5,
  },
});
