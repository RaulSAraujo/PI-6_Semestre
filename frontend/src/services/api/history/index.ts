import { Api } from "../axios-config";
import { ListedShareHistory } from "@models/listed-share-history";

type params = {
  page?: number;
};

async function get({ page = 1 }: params) {
  try {
    const { data } = await Api.get<ListedShareHistory>(`/listed-share-history`, {
      params: {
        page: page,
        size: 8,
      }
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export const HistoryService = {
  get,
};
