import { ComponentProps, useState } from 'react';

import { StyleProp, ViewStyle } from 'react-native';

import { Input as InputElement } from '@rneui/themed';

import { styles } from './styles';

type InputElementProps = ComponentProps<typeof InputElement> & {
  inputRef?: any;
  inputContainerStyle?: StyleProp<ViewStyle>;
};

export function Input(props: InputElementProps) {
  const { inputRef, inputContainerStyle, ...rest } = props;

  const [isFocused, setIsFocused] = useState(false);

  return (
    <InputElement
      {...rest}
      ref={inputRef}
      renderErrorMessage={false}
      autoCorrect={false}
      autoCapitalize="none"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      inputContainerStyle={[inputContainerStyle, isFocused && styles.focused]}
    />
  );
}
