import { FormSignIn, SignIn } from "@models/sign-in";
import { FormSignUp, SignUp } from "@models/sign-up";

import { Api } from "../axios-config";

async function signIn(props: FormSignIn) {
  try {
    const { data } = await Api.post<SignIn>("/sign-in", props);

    return data;
  } catch (error) {
    throw error;
  }
}

async function signUp(props: FormSignUp) {
  try {
    const { data } = await Api.post<SignUp>("/sign-up", props);

    return data;
  } catch (error) {
    throw error;
  }
}

export const Auth = {
  signIn,
  signUp,
};
