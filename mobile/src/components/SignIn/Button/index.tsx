import { ComponentProps } from 'react';

import { Button as ButtonElement } from '@rneui/themed';

import { styles } from './styles';

type Props = ComponentProps<typeof ButtonElement>;

export function Button({ ...rest }: Props) {
  return <ButtonElement {...rest} title="ENTRAR" containerStyle={styles.container} />;
}
