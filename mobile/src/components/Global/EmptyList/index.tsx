import { Text, View } from 'react-native';

import { Button, Icon } from '@rneui/themed';

import { styles } from './styles';

type EmptyProps = {
  message?: string;
  reload?: () => void;
  activeReload?: boolean;
  loadingIndicator?: boolean;
};

export function EmptyList(props: EmptyProps) {
  const {
    reload,
    message = 'Nenhum item encontrado',
    activeReload = false,
    loadingIndicator = false,
  } = props;

  function renderIcon() {
    return <Icon name="reload" type="material-community" color="white" style={styles.icon} />;
  }

  return (
    <View style={styles.container}>
      <Icon name="note-search" type="material-community" size={80} />

      <Text style={styles.message}>{message}</Text>

      {activeReload && (
        <Button
          title="Reload"
          icon={renderIcon()}
          iconPosition="right"
          buttonStyle={styles.button}
          containerStyle={styles.containerButton}
          onPress={reload}
          loading={loadingIndicator}
        />
      )}
    </View>
  );
}
