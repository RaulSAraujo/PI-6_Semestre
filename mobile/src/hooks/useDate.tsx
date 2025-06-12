import { useMemo } from 'react';

import dayjs, { Dayjs } from 'dayjs';

import relativeTime from 'dayjs/plugin/relativeTime';

import 'dayjs/locale/pt-br';

// Extensões do dayjs
dayjs.extend(relativeTime);

type DateUnit = 'day' | 'month' | 'year' | 'hour' | 'minute' | 'second';

const useDate = () => {
  // Função para formatar uma data
  const formatDate = (
    date: string | number | Date | Dayjs,
    formatString: string = 'DD/MM/YYYY'
  ): string => {
    return dayjs(date).format(formatString);
  };

  // Função para calcular tempo relativo
  const fromNow = (date: string | number | Date | Dayjs): string => {
    return dayjs(date).locale('pt-br').fromNow();
  };

  // Função para verificar se uma data é anterior a outra
  const isBefore = (
    date1: string | number | Date | Dayjs,
    date2: string | number | Date | Dayjs
  ): boolean => {
    return dayjs(date1).isBefore(date2);
  };

  // Função para adicionar ou subtrair unidades de tempo
  const manipulateDate = (
    date: string | number | Date | Dayjs,
    amount: number,
    unit: DateUnit
  ): string => {
    return dayjs(date).add(amount, unit).format('DD/MM/YYYY');
  };

  // Função para definir o idioma da data
  const setLocale = (locale: string = 'pt-br'): void => {
    dayjs.locale(locale);
  };

  // Função para validar a data
  const isValidDate = (date: string | number | Date | Dayjs): boolean => {
    return dayjs(date).isValid();
  };

  const formatDateWithTimeToTextBr = (date: string | number | Date | dayjs.Dayjs): string => {
    return dayjs(date).locale('pt-br').format('DD [de] MMMM [de] YYYY');
  };

  // Memoize as funções para evitar recalculá-las desnecessariamente
  return useMemo(
    () => ({
      formatDate,
      fromNow,
      isBefore,
      manipulateDate,
      setLocale,
      isValidDate,
      formatDateWithTimeToTextBr,
    }),
    []
  );
};

export default useDate;
