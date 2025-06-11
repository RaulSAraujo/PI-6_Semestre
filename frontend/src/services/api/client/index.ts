import { Client, Item } from "@models/client";

import { Api } from "../axios-config";

type params = {
  id?: number;
  page?: number;
};

async function get({ page = 1, id }: params) {
  try {
    let idCache = `list-clients-${page}`;

    if (id) {
      idCache = `${idCache}-${id}`;
    }

    const { data } = await Api.get<Client>("/clients", {
      id: idCache,
      params: {
        id: id ? id : undefined,
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

async function update(form: Partial<Item>, page: number) {
  try {
    const idCache = `list-clients-${page}`;

    const { data } = await Api.put<Item>(`/clients/${form.id}`, form, {
      cache: {
        update: {
          [idCache]: async (listCache) => {
            if (listCache.state !== "cached") {
              return "ignore";
            }

            const data = listCache.data.data as Client;

            const index = await data.items.findIndex(
              (item) => item.id === form.id
            );

            const oldItem = data.items[index];

            data.items.splice(index, 1);

            data.items.splice(index, 0, {
              active: oldItem.active,
              document: form.document || oldItem.document,
              id: form.id || oldItem.id,
              name: form.name || oldItem.name,
              observation: form.observation || oldItem.observation,
              type: form.type || oldItem.type,
              id_profile: form.id_profile || oldItem.id_profile,
              created_at: oldItem.created_at,
              updated_at: oldItem.updated_at,
              deleted_at: null,
            });

            return listCache;
          },
          [`${idCache}-${form.id}`]: "delete",
        },
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
}

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
  update,
  remove,
};
