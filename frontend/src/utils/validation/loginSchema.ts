import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup.string().required("Nome de usuário é obrigatório"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(5, "A senha deve ter pelo menos 5 caracteres"),
});
