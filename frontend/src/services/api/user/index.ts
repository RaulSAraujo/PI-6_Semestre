import { Api } from "../axios-config";
import { User } from "@models/user";

type params = {
  page?: number;
};

const get = async ({ page = 1 }: params) => {
  try {
    const { data } = await Api.get<User>("/users", {
      id: `list-users-${page}`,
      params: {
        page: page,
        size: 8,
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const UserService = {
  get,
};
