import { Api } from "../axios-config";
import { User, Item } from "@types/user";

const getAll = async () => {
  try {
    const { data } = await Api.get<User>("/users");

    return data;
  } catch (error) {
    throw error;
  }
};

const getById = async (id: number): Promise<Item | Error> => {
  try {
    const { data } = await Api.get(`/Doctor/${id}`);

    if (data) {
      return data;
    }

    return new Error("Erro ao consultar o registro.");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao consultar o registro."
    );
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
  getAll,
  getById,
  create,
};
