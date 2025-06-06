export interface User {
  items: Item[];
  totalItems: number;
}

export interface Item {
  id: number;
  cpf: string;
  email: string;
  name: string;
  password_hash: string;
  is_admin: boolean;
  active: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}
