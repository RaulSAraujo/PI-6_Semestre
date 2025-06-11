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

async function create(form: Partial<Item>, page: number) {
  try {
    const idCache = `list-clients-${page}`;

    const { data } = await Api.post<Item>("/clients", form, {
      cache: {
        update: {
          [idCache]: (listCache, create) => {
            if (listCache.state !== "cached") {
              return "ignore";
            }

            const data = listCache.data.data as Client;

            if (data.totalItems > 8) {
              data.items.pop();
            }

            data.items.splice(0, 0, create.data);

            data.totalItems += 1;

            return listCache;
          },
        },
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
}

// async function update(id: number, form: Partial<Item>) {
//   try {
//     const { data } = await Api.put<Item>(`/clients/${id}`, form);
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

async function remove(id: number, page: number) {
  try {

    const idCache = `list-clients-${page}`;

    await Api.delete<Item>(`/clients/${id}`, {
      cache: {
        update: {
          [idCache]: (listCache) => {
            if (listCache.state !== "cached") {
              return "ignore";
            }

            const data = listCache.data.data as Client;

            const index = data.items.findIndex((item) => item.id === id);

            data.items.splice(index, 1);

            data.totalItems -= 1;

            return listCache;
          },
        },
      },
    });
  } catch (error) {
    throw error;
  }
}

export const ClientesService = {
  get,
  create,
  remove,
};
