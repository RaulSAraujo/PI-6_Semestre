import { useState } from "react";

import * as yup from "yup";
import { useNavigate } from "react-router-dom";

import { Auth } from "@services/api/auth";
import { registerSchema } from "@utils/validation/registerSchema";

import { Header } from "./Header";
import { Submit } from "./Submit";
import { Redirect } from "./Redirect";
import { StyledPaper } from "./styles";
import {
  CpfInput,
  FullNameInput,
  PasswordInput,
  UserNameInput,
} from "./Inputs";

type Props = {
  setSuccessMessage: (value: string) => void;
};

export function Form({ setSuccessMessage }: Props) {
  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpfError, setCpfError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const clearErrors = () => {
    setCpfError("");
    setNameError("");
    setEmailError("");
    setPasswordError("");
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    clearErrors();

    try {
      const validation = await registerSchema.validate(
        { cpf, email, name, password },
        { abortEarly: false }
      );

      const userData = {
        cpf: validation.cpf,
        email: validation.email,
        name: validation.name,
        password: validation.password,
      };

      await Auth.signUp(userData);

      setSuccessMessage("Cadastro realizado com sucesso!");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (errors) {
      const e = errors as yup.ValidationError;

      e.inner.forEach((error) => {
        if (error.path === "cpf") {
          setCpfError(error.message);
        } else if (error.path === "email") {
          setEmailError(error.message);
        } else if (error.path === "name") {
          setNameError(error.message);
        } else if (error.path === "password") {
          setPasswordError(error.message);
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledPaper elevation={0}>
      <Header />

      <CpfInput
        cpf={cpf}
        setCpf={setCpf}
        cpfError={cpfError}
        setCpfError={setCpfError}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
      />

      <UserNameInput
        username={email}
        setUsername={setEmail}
        usernameError={emailError}
        setUsernameError={setEmailError}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
      />

      <FullNameInput
        fullName={name}
        setFullName={setName}
        fullNameError={nameError}
        setFullNameError={setNameError}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
      />

      <PasswordInput
        password={password}
        setPassword={setPassword}
        setPasswordError={setPasswordError}
        passwordError={passwordError}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />

      <Submit isLoading={isLoading} handleSubmit={handleSubmit} />

      <Redirect isLoading={isLoading} />
    </StyledPaper>
  );
}
