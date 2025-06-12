import { View } from 'react-native';
import { Item } from '@dtos/InvestmentDTO';
import { styles } from '@styles/wallet';

import { InvestmentDashboard } from '@components/Wallet';

export default function Wallet() {
  const investmentData: Item[] = [
    {
      id: 1,
      id_client: 123,
      id_listed_shares: 1001,
      share_price: '27.56',
      quantity_purchased: 200,
      invested_amount: '5512.00',
      created_at: new Date('2024-01-15'),
      updated_at: new Date('2024-01-15'),
      deleted_at: null,
    },
    // Adicione mais itens aqui...
  ];

  return (
    <View style={styles.container}>
      <InvestmentDashboard items={investmentData} userName="João Silva" />
    </View>
  );
}
