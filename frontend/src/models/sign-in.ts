export interface SignIn {
  user: UserClass;
  access_token: string;
}

export interface UserClass {
  id: number;
  cpf: string;
  email: string;
  name: string;
  is_admin: boolean;
  active: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}

export interface FormSignIn {
  username: string;
  password: string;
}
