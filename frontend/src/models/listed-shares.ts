export interface ListedShares {
  items: Item[];
  totalItems: number;
}

export interface Item {
  id: number;
  ticker: string;
  name: string;
  b3_sector_classification: string;
  id_profile: number;
  active: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}
