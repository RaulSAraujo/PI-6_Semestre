import { View, Text } from 'react-native';

import { styles } from './styles';

interface Props {
  userName?: string;
}

export function DashboardHeader({ userName }: Props) {
  return (
    <View style={styles.header}>
      <Text style={styles.welcomeText}>Olá, {userName || 'Investidor'}! 👋</Text>
      <Text style={styles.headerSubtitle}>Aqui está o resumo dos seus investimentos</Text>
    </View>
  );
}
