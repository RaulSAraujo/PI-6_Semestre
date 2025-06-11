import { ListedShares } from "@models/listed-shares";

import { Api } from "../axios-config";

type params = {
  page?: number;
};

async function get({ page = 1 }: params) {
  try {
    const { data } = await Api.get<ListedShares>("/listed-shares", {
      id: `list-listed-shares-${page}`,
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

export const ActionB3Service = {
  get,
};
