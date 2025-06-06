import * as yup from "yup";

export const registerSchema = yup.object().shape({
  cpf: yup.string().required("CPF é obrigatório"),
  email: yup.string().required("Email é obrigatório").email("Email inválido"),
  name: yup.string().required("Nome é obrigatório"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      "Senha inválida! Deve conter 8 ou mais caracteres, pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial."
    ),
});
