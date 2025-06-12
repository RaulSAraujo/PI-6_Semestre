import { Text, TouchableOpacity, View } from 'react-native';

import { Item } from '@dtos/HistoryDTO';

import useStyles from './styles';

interface Props {
  data: Item & {
    companyName?: string;
    companyCode?: string;
  };
  bottomDivider?: boolean;
  onPress?: () => void;
}

const formatCurrency = (value: string): string => {
  const parseValue = parseFloat(value);

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(parseValue);
};

const formatVolume = (value: string): string => {
  const parseValue = parseFloat(value);

  if (parseValue >= 1000000) {
    return `${(parseValue / 1000000).toFixed(1)}M`;
  }
  if (parseValue >= 1000) {
    return `${(parseValue / 1000).toFixed(1)}K`;
  }
  return parseValue.toString();
};

const formatVariation = (value: string): string => {
  const parseValue = parseFloat(value);

  const sign = parseValue >= 0 ? '+' : '';

  return `${sign}${parseValue.toFixed(2)}%`;
};

export function ListItem({ data, bottomDivider, onPress }: Props) {
  const styles = useStyles();

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      style={[styles.container, bottomDivider && styles.bottomDivider]}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.companyInfo}>
            <Text style={styles.title}>{data.companyName}</Text>
            {data.companyCode && <Text style={styles.code}>{data.companyCode}</Text>}
          </View>

          <View style={styles.currentPriceContainer}>
            <Text style={styles.currentPrice}>{formatCurrency(data.last_value)}</Text>
            <View
              style={[styles.variationBadge, { backgroundColor: true ? '#4CAF50' : '#F44336' }]}>
              <Text style={styles.variationText}>{formatVariation(data.percentage_change)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.dataGrid}>
          <View style={styles.dataItem}>
            <Text style={styles.dataLabel}>Abertura</Text>
            <Text style={styles.dataValue}>{formatCurrency(data.opening)}</Text>
          </View>

          <View style={styles.dataItem}>
            <Text style={styles.dataLabel}>Mín/Máx</Text>
            <Text style={styles.dataValue}>
              {formatCurrency(data.low)} / {formatCurrency(data.high)}
            </Text>
          </View>

          <View style={styles.dataItem}>
            <Text style={styles.dataLabel}>Volume</Text>
            <Text style={styles.dataValue}>{formatVolume(data.trading_volume)}</Text>
          </View>
        </View>
      </View>
    </Container>
  );
}
