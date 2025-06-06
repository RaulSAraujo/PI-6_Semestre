export interface SignUp {
  id: number;
  cpf: string;
  name: string;
  email: string;
  password_hash: string;
  active: boolean;
  is_admin: boolean;
  updated_at: Date;
  created_at: Date;
}

export interface FormSignUp {
  cpf: string;
  name: string;
  email: string;
  password: string;
}
