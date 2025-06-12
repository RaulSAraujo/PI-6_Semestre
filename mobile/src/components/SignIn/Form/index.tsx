import { useRef, useState } from 'react';

import * as yup from 'yup';
import { TextInput, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';

import { Icon } from '@rneui/themed';
import { Input } from '@components/Global/Input';
import { yupResolver } from '@hookform/resolvers/yup';

import { styles } from './styles';
import { Button } from '../Button';

type FormProps = {
  handleLogin: (data: FormDataProps) => void;
  isLoading?: boolean;
};

type FormDataProps = {
  username: string;
  password: string;
};

const singInSchema = yup.object({
  username: yup.string().required('CPF/Email invalido.'),
  password: yup.string().required('Senha invalida.'),
});

export function Form({ handleLogin, isLoading }: FormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({ resolver: yupResolver(singInSchema) });

  const [showPassword, setShowPassword] = useState(false);
  const handleState = () => setShowPassword((showState) => !showState);

  const passwordRef = useRef<TextInput | null>(null);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value } }) => (
          <Input
            value={value}
            placeholder="CPF/Email"
            onChangeText={onChange}
            errorMessage={errors.username?.message}
            returnKeyType="next"
            blurOnSubmit={false}
            inputStyle={{ color: 'white' }}
            placeholderTextColor={'rgba(255, 255, 255, 0.4)'}
            inputContainerStyle={styles.inputContainer}
            onSubmitEditing={() => passwordRef.current?.focus()}
            containerStyle={errors.username?.message ? {} : { marginBottom: 10 }}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <Input
            inputRef={passwordRef}
            value={value}
            placeholder="Senha"
            secureTextEntry={!showPassword}
            returnKeyType="send"
            onChangeText={onChange}
            errorMessage={errors.password?.message}
            onSubmitEditing={handleSubmit(handleLogin)}
            inputStyle={{ color: 'white' }}
            placeholderTextColor={'rgba(255, 255, 255, 0.4)'}
            inputContainerStyle={styles.inputContainer}
            containerStyle={errors.username?.message ? {} : { marginBottom: 10 }}
            rightIcon={
              <Icon
                name={showPassword ? 'eye' : 'eye-off'}
                type="ionicon"
                size={25}
                color="rgba(255, 255, 255, 0.4)"
                onPress={handleState}
              />
            }
          />
        )}
      />

      <Button loading={isLoading} onPress={handleSubmit(handleLogin)} />
    </View>
  );
}
