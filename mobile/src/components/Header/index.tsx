import React from "react";
import { Picker } from '@react-native-picker/picker';

import { Container, Title, Image } from './styles';

import { MONTHS } from '../../utils/months';

export type MonthsProps = "Sensor-Gas" | "Sensor-Chuva" | "Sensor-Proximidade";

type Props = {
  selectedValue: MonthsProps;
  onValueChange: (value: MonthsProps) => void;
}

export function Header({ selectedValue, onValueChange }: Props) {
  return (
    <Container>
      <Image  source={require('../../img/logo.png')}/>

      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue: MonthsProps) => onValueChange(itemValue)}
        style={{
          backgroundColor: '#FFF',
          height: 50,
          flex: 1,
          marginLeft: 50
        }}
      >
        {
          MONTHS.map(item => (
            <Picker.Item
              key={item.label}
              label={item.label}
              value={item.label}
            />
          ))
        }
      </Picker>
    </Container>
  );
}
