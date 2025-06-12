import { createContext, useState, useRef, useCallback, useMemo, useEffect } from 'react';
import type { ReactNode } from 'react';

type ToastAction = 'error' | 'info' | 'warning' | 'success';

interface ToastOptions {
  action?: ToastAction;
  bgColor?: string;
  duration?: number;
}

interface ToastMessage extends ToastOptions {
  id: string;
  text: string;
}

interface ToastContextData {
  messages: ToastMessage[];
  showToast: (text: string, options?: ToastOptions) => void;
  hideToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextData | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);
  const timersRef = useRef<Record<string, NodeJS.Timeout>>({});

  const hideToast = useCallback((id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
    const timer = timersRef.current[id];
    if (timer) {
      clearTimeout(timer);
      delete timersRef.current[id];
    }
  }, []);

  const showToast = useCallback(
    (text: string, options?: ToastOptions) => {
      const id = Math.random().toString(36).substring(2, 9);
      const duration = options?.duration ?? 3000;

      setMessages((prev) => {
        // Limita o número máximo de toasts visíveis simultaneamente
        const maxToasts = 3;
        const updatedMessages = [...prev, { id, text, ...options }];
        return updatedMessages.slice(-maxToasts);
      });

      // Limpa qualquer timer existente para o mesmo toast (caso de chamadas duplicadas)
      if (timersRef.current[id]) {
        clearTimeout(timersRef.current[id]);
      }

      timersRef.current[id] = setTimeout(() => {
        hideToast(id);
      }, duration);
    },
    [hideToast]
  );

  // Limpa todos os timers ao desmontar o provider
  useEffect(() => {
    return () => {
      Object.values(timersRef.current).forEach(clearTimeout);
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      messages,
      showToast,
      hideToast,
    }),
    [messages, showToast, hideToast]
  );

  return <ToastContext.Provider value={contextValue}>{children}</ToastContext.Provider>;
};
