import { Client, Item } from "@models/client";

import { Api } from "../axios-config";

type params = {
  page?: number;
};

async function get({ page = 1 }: params) {
  try {
    const { data } = await Api.get<Client>("/clients", {
      id: `list-clients-${page}`,
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

async function create(form: Partial<Item>) {
  try {
    const { data } = await Api.post<Item>("/clients", form, {
      cache: {
        update: {
          "list-clients-1": (listCache, create) => {
            if (listCache.state !== "cached") {
              return "ignore";
            }

            const data = listCache.data.data as Client;

            data.items.pop();

            data.items.splice(0, 0, create.data);

            data.totalItems += 1;

            return listCache;
          },
        },
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao criar o registro."
    );
  }
}

export const ClientesService = {
  get,
  create,
};
