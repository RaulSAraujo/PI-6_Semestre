import { useEffect } from 'react';

import { Text, TouchableWithoutFeedback, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useToast } from '@hooks/useToast';

import { styles } from './styles';

const ToastContainer = () => {
  const { messages, hideToast } = useToast();

  const getBackgroundColor = (action?: 'error' | 'info' | 'warning' | 'success') => {
    switch (action) {
      case 'error':
        return '#ef4444';
      case 'info':
        return '#3b82f6';
      case 'warning':
        return '#f59e0b';
      case 'success':
        return '#10b981';
      default:
        return '#333333';
    }
  };

  if (messages.length === 0) return null;

  return (
    <View style={styles.container}>
      {messages.map((message) => {
        const bgColor = message.bgColor || getBackgroundColor(message.action);

        return (
          <ToastItem
            key={message.id}
            message={message.text}
            bgColor={bgColor}
            onDismiss={() => hideToast(message.id)}
          />
        );
      })}
    </View>
  );
};

const ToastItem = ({
  message,
  bgColor,
  onDismiss,
}: {
  message: string;
  bgColor: string;
  onDismiss: () => void;
}) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, { duration: 300 });
    return () => {
      progress.value = 0;
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [
        {
          translateY: interpolate(progress.value, [0, 1], [-20, 0]),
        },
      ],
    };
  });

  return (
    <TouchableWithoutFeedback onPress={onDismiss}>
      <Animated.View style={[styles.toast, { backgroundColor: bgColor }, animatedStyle]}>
        <Text style={styles.text}>{message}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default ToastContainer;
