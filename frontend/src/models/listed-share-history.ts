export interface ListedShareHistory {
  items: Item[];
  totalItems: number;
}

export interface Item {
  id: number;
  id_listed_shares: number;
  date: Date;
  last_value: string;
  opening: string;
  high: string;
  low: string;
  trading_volume: string;
  percentage_change: string;
  id_profile: number;
  created_at: Date;
  updated_at: Date;
}
