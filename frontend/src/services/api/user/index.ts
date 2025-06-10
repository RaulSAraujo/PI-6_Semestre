import { Api } from "../axios-config";
import { User, Item } from "@models/user";

type params = {
  page?: number;
};

const get = async ({ page = 1 }: params) => {
  try {
    const { data } = await Api.get<User>("/users", {
      params: {
        page: page,
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
};

const create = async (dados: Omit<Item, "id">): Promise<number | Error> => {
  try {
    const { data } = await Api.post<Item>("/Doctor", dados);

    if (data) {
      return data.id;
    }

    return new Error("Erro ao criar o registro.");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao criar o registro."
    );
  }
};

export const UserService = {
  get,
  create,
};
