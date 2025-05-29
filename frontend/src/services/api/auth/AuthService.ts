import { Api } from "../axios-config";

interface IAuth {
  access_token: string;
}

const auth = async (
  username: string,
  password: string
): Promise<IAuth | Error> => {
  try {
    const { data } = await Api.post("/sign-in", { username, password });

    return data;
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro no login."
    );
  }
};

export const AuthService = {
  auth,
};
