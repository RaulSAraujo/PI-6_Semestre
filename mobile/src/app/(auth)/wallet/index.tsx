import { useEffect, useState } from 'react';

import { View } from 'react-native';

import { styles } from '@styles/wallet';
import { useAuth } from '@hooks/useAuth';
import { Dashboard } from '@components/Wallet';
import { useWalletActions, useWalletState } from '@store/wallet';

export default function Wallet() {
  const { user } = useAuth();

  const [refreshing, setRefreshing] = useState(false);

  const investmentData = useWalletState();

  const { fetchData } = useWalletActions();

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Dashboard
        items={investmentData}
        userName={user?.name}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    </View>
  );
}
