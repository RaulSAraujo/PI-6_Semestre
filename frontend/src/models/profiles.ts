export interface Profiles {
  items: Item[];
  totalItems: number;
}

export interface Item {
  id: number;
  type: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}
