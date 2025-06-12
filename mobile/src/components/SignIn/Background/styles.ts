import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  image: {
    flex: 1,
  },
  overlay: {
    flexGrow: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});
