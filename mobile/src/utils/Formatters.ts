/**
 * Utilitários de formatação para React Native
 *
 * Funções disponíveis:
 * - capitalize(text): Capitaliza a primeira letra de cada palavra
 * - formatCPF(cpf): Formata um CPF (000.000.000-00)
 * - formatCNPJ(cnpj): Formata um CNPJ (00.000.000/0000-00)
 * - formatNumber(number): Formata números com separadores de milhares
 * - removeFormatting(text): Remove toda a formatação (pontos, traços, etc)
 */

// Capitaliza a primeira letra de cada palavra
export const capitalize = (text: string | null | undefined) => {
  if (!text) return text;

  return text
    .toLowerCase()
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Capitaliza a primeira letra
export const capitalizeLetter = (text: string | null | undefined) => {
  if (!text) return text;

  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

// Formata CPF (000.000.000-00)
export const formatCPF = (cpf: string | null | undefined) => {
  if (!cpf) return cpf;

  // Remove tudo que não é dígito
  const cleaned = cpf.replace(/\D/g, '');

  // Aplica a formatação
  return cleaned
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

// Formata CNPJ (00.000.000/0000-00)
export const formatCNPJ = (cnpj: string | null | undefined) => {
  if (!cnpj) return cnpj;

  // Remove tudo que não é dígito
  const cleaned = cnpj.replace(/\D/g, '');

  // Aplica a formatação
  return cleaned
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
};

// Formata telefone (00000-0000)
export const formatPhone = (phone: string | null | undefined) => {
  if (!phone) return '';

  // Remove tudo que não é dígito
  const cleaned = phone.replace(/\D/g, '');

  // Verifica se é um celular (com 9º dígito)
  const isMobile = cleaned.length === 11;

  // Aplica a formatação
  if (cleaned.length <= 2) {
    return `(${cleaned}`;
  } else if (cleaned.length <= 6) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  } else if (cleaned.length <= 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  } else if (isMobile) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  } else {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }
};

export const formatMoney = (value: string | number | null) => {
  if (!value) return '0,00';

  if (typeof value === 'string') {
    value = parseFloat(value);
  }

  if (isNaN(value)) return '0,00';

  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// Remove toda a formatação (pontos, traços, etc)
export const removeFormatting = (text: string) => {
  if (!text) return '';

  return text.replace(/\D/g, '');
};
