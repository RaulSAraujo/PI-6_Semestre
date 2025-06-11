import { InvestmentPortfolio, Item } from "@models/investment-portfolio";

import { Api } from "../axios-config";

type params = {
  id?: number;
  page?: number;
};

async function get({ page = 1, id }: params) {
  try {
    let idCache = `list-investment-portfolio-${page}`;

    if (id) {
      idCache = `${idCache}-${id}`;
    }

    const { data } = await Api.get<InvestmentPortfolio>(
      "/investment-portfolio",
      {
        id: idCache,
        params: {
          id: id ? id : undefined,
          page: page,
          size: 8,
        },
      }
    );

    return data;
  } catch (error) {
    throw error;
  }
}

async function create(form: Partial<Item>, page: number) {
  try {
    const idCache = `list-clients-${page}`;

    const { data } = await Api.post<Item>("/investment-portfolio", form, {
      cache: {
        update: {
          [idCache]: (listCache, create) => {
            if (listCache.state !== "cached") {
              return "ignore";
            }

            const data = listCache.data.data as InvestmentPortfolio;

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

            const data = listCache.data.data as InvestmentPortfolio;

            const index = await data.items.findIndex(
              (item) => item.id === form.id
            );

            const oldItem = data.items[index];

            data.items.splice(index, 1);

            data.items.splice(index, 0, {
              id: form.id || oldItem.id,
              id_client: form.id_client || oldItem.id_client,
              id_listed_shares:
                form.id_listed_shares || oldItem.id_listed_shares,
              invested_amount: form.invested_amount || oldItem.invested_amount,
              quantity_purchased:
                form.quantity_purchased || oldItem.quantity_purchased,
              share_price: form.share_price || oldItem.share_price,
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

            const data = listCache.data.data as InvestmentPortfolio;

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

export const WalletService = {
  get,
  create,
  update,
  remove,
};
