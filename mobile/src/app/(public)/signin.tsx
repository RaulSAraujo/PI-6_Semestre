import { useState } from 'react';

import { useAuth } from '@hooks/useAuth';
import { useToast } from '@hooks/useToast';
import { AppError } from '@utils/AppError';
import { BackGround, Form, Logo } from '@components/SignIn';
import { KeyboardAvoidingView, Platform } from 'react-native';

type FormDataProps = {
  username: string;
  password: string;
};

export default function SigninScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const { singIn } = useAuth();

  const { showToast } = useToast();

  const handleLogin = async (data: FormDataProps) => {
    try {
      setIsLoading(true);

      await singIn(data);
    } catch (e) {
      const isAppError = e instanceof AppError;

      const title = isAppError ? e.message || e.error : 'Erro desconhecido.';

      setIsLoading(false);

      showToast(title, { action: 'error' });
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      style={{ flex: 1 }}>
      <BackGround>
        <Logo />

        <Form isLoading={isLoading} handleLogin={handleLogin} />
      </BackGround>
    </KeyboardAvoidingView>
  );
}
