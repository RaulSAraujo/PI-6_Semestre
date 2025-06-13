export type Investment = {
  items: Item[];
  totalItems: number;
};

export type Item = {
  id: number;
  id_client: number;
  id_listed_shares: number;
  share_price: string;
  quantity_purchased: number;
  invested_amount: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
};

export type FormData = {
  id: string | undefined;
  id_client: string;
  share_price: string;
  invested_amount: string;
  id_listed_shares: string;
  quantity_purchased: string;
};

export interface InvestmentSummary {
  totalInvested: number;
  totalCurrentValue: number;
  totalProfit: number;
  totalAssets: number;
  totalQuantity: number;
  profitPercentage: number;
}

