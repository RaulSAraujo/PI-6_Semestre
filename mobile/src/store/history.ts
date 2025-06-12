import { create } from 'zustand';

import { api } from '@services/api';
import { InvestmentPortfolio } from '@dtos/InvestmentDTO';

interface List {
  page: number;
  endReached: boolean;
  totalRecords: number;
  disabledEndReached: boolean;
  data: Record<string, unknown>[];
  loading: boolean;
  refreshing: boolean;
}

const initialList: List = {
  page: 1,
  endReached: false,
  disabledEndReached: false,
  totalRecords: 0,
  data: [],
  loading: false,
  refreshing: false,
};

interface Store {
  list: List;
  actions: {
    setRefreshing: (value: boolean) => void;
    setEndReached: (value: boolean) => void;
    fetchData: (config: { loading: boolean }) => Promise<void>;
    
  };
}

const store = create<Store>((set, get) => ({
  list: initialList,
  actions: {
    setRefreshing: (value) => set({ list: { ...get().list, refreshing: value } }),

    setEndReached: (value) => set({ list: { ...get().list, endReached: value } }),

    fetchData: async ({ loading }) => {
      if (loading || get().list.refreshing) {
        set({ list: { ...get().list, page: 1, loading } });
      }

      if (get().list.endReached) {
        set({ list: { ...get().list, page: get().list.page + 1 } });
      }

      const { list } = get();

      try {
        const res = await api.get<InvestmentPortfolio>('/listed-share-history', {
          id: `listed-share-history-${list.page}`,
          params: {
            page: list.endReached ? list.page : 1,
            size: 15,
          },
        });

        const updatedData = list.endReached ? [...list.data, ...res.data.items] : res.data.items;

        set({
          list: {
            ...list,
            data: updatedData,
            loading: false,
            refreshing: false,
            endReached: false,
            totalRecords: res.data.totalItems,
            disabledEndReached: res.data.totalItems < 15,
          },
        });
      } catch (e) {
        set({
          list: {
            ...list,
            loading: false,
            refreshing: false,
            endReached: false,
            disabledEndReached: true,
            totalRecords: list.data.length,
          },
        });

        throw e;
      }
    },
  },
}));

export const useHistoryState = () => store().list;

export const useHistoryActions = () => store().actions;
