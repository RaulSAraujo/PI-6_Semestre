import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('screen');

export const styles = StyleSheet.create({
  image: {
    height: 58,
    marginBottom: 50,
    width: width * 0.8,
    resizeMode: 'contain',
  },
});
