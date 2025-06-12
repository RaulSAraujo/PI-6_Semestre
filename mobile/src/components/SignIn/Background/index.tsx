import { ReactNode } from 'react';

import { ImageBackground, View } from 'react-native';

import BackgroundImg from '@assets/background.png';

import { style } from './styles';

type Props = {
  children: ReactNode;
};

export function BackGround({ children }: Props) {
  return (
    <ImageBackground source={BackgroundImg} alt="background-img-blue" style={style.image}>
      <View style={style.overlay}>
        {children}
      </View>
    </ImageBackground>
  );
}
