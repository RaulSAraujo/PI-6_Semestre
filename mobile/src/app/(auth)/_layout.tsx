import { View } from 'react-native';
import { Tabs } from 'expo-router';

import { Header } from '@components/Header';
import { Icon, useTheme } from '@rneui/themed';

export default function AuthLayout() {
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <Header />

      <Tabs
        screenOptions={{
          lazy: true,
          headerShown: false,
          animation: 'shift',
          tabBarStyle: { backgroundColor: 'white' },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.black,
        }}>
        <Tabs.Screen
          name="wallet/index"
          options={{
            title: 'Carteira',
            tabBarIcon: ({ color }) => (
              <Icon size={28} name="wallet" type="material-community" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="history/index"
          options={{
            title: 'Histórico',
            tabBarIcon: ({ color }) => (
              <Icon size={28} name="history" type="material" color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
