import { View } from 'react-native';

import { Image } from '@rneui/themed';
import logoImg from '@assets/favicon.png';

import { styles } from './styles';

export const UserPhoto = () => {
  return (
    <View style={styles.avatarContainer}>
      <Image
        source={logoImg}
        resizeMode="cover"
        alt="business-logo"
        style={styles.avatarImage}
      />
    </View>
  );
};
