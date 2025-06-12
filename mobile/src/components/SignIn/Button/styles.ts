import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('screen');

export const styles = StyleSheet.create({
  container: {
    width: width * 0.5,
    borderRadius: 10,
    marginTop: 25,
  },
});
