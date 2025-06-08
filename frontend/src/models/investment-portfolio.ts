export interface InvestmentPortfolio {
  items: Item[];
  totalItems: number;
}

export interface Item {
  id: number;
  id_client: number;
  id_listed_shares: number;
  share_price: string;
  quantity_purchased: number;
  invested_amount: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}
