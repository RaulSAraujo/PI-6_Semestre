import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('screen');

export const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width * 0.8,
    display: 'flex',
    alignItems: 'center',
  },
});
