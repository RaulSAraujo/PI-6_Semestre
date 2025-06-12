export type Auth = {
  user: User;
  access_token: string;
};
export type User = {
  id: number;
  cpf: string;
  email: string;
  name: string;
  is_admin: boolean;
  active: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
};

export type FormSignIn = {
  username: string;
  password: string;
};
