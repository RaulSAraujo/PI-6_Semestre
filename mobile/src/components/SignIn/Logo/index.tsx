import { Image } from '@rneui/themed';
import LogoImg from '@assets/logo.png';

import { styles } from './styles';
export function Logo() {
  return <Image source={LogoImg} alt="logo-enterprise" style={styles.image} />;
}
