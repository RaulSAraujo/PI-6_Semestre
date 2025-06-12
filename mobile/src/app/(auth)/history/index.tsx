import { View } from 'react-native';

import { styles } from '@styles/history';
import { List } from '@components/History';
import { useShareActions } from '@store/shares';
import { useEffect } from 'react';

export default function History() {
  const { fetchData: fetchShare } = useShareActions();

  useEffect(() => {
    fetchShare();
  }, []);

  return (
    <View style={styles.container}>
      <List />
    </View>
  );
}
