import { memo } from 'react';

import { useAuth } from '@hooks/useAuth';
import { Icon, ListItem } from '@rneui/themed';

import { styles } from './style';
import { UserPhoto } from './UserPhoto';

const HeaderComponent = () => {
  const { user, signOut } = useAuth();

  return (
    <ListItem key="header-component" containerStyle={styles.container}>
      <UserPhoto />

      <ListItem.Content>
        <ListItem.Title style={styles.title}>Olá,</ListItem.Title>

        <ListItem.Subtitle numberOfLines={1} style={styles.subtitle}>
          {user?.name}
        </ListItem.Subtitle>
      </ListItem.Content>

      <Icon name="exit-to-app" onPress={signOut} />
    </ListItem>
  );
};

export const Header = memo(HeaderComponent);
