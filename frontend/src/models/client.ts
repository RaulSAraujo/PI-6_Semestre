export interface Client {
  items: Item[];
  totalItems: number;
}

export interface Item {
  id: number;
  type: string;
  name: string;
  document: string;
  observation: string;
  active: boolean;
  id_profile: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}

export interface FormClient {
  id: number | undefined;
  type: string;
  name: string;
  document: string;
  observation: string;
  active: boolean;
  id_profile: string;
}
