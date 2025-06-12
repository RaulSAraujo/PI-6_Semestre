import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('screen');

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: width * 0.8,
    alignItems: 'center',
  },
  inputContainer: {
    borderColor: 'rgba(255, 255, 255, 0.25)',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});
