import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function InitialScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1E88E5" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
