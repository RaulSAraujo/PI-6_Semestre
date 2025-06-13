import { Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

import { Card, Icon } from '@rneui/themed';

import { styles } from './styles';

interface Props {
  title: string;
  value: string;
  icon: string;
  color: string;
  iconType: string;
  backgroundColor: string;
}

export function SummaryCard({ title, value, icon, iconType, color, backgroundColor }: Props) {
  return (
    <Card containerStyle={styles.summaryCard}>
      <View style={styles.cardContent}>
        <View style={[styles.iconContainer, { backgroundColor }]}>
          <Icon name={icon} type={iconType} size={moderateScale(20)} color={color} />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardValue}>{value}</Text>
        </View>
      </View>
    </Card>
  );
}
