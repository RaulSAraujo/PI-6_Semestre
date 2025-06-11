import { Api } from "../axios-config";

import { Profiles } from "@models/profiles";

type params = {
  page?: number;
};

async function get({ page = 1 }: params) {
  try {
    const { data } = await Api.get<Profiles>("/profiles", {
      id: "list-profiles",
      params: {
        page: page,
        size: 8,
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export const ProfileService = {
  get,
};
