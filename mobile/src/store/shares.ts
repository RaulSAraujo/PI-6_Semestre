import { create } from 'zustand';

import { api } from '@services/api';
import { Shares, Item } from '@dtos/SharesDTO';

interface Store {
  shares: Item[];
  actions: {
    fetchData: () => Promise<void>;
  };
}

const store = create<Store>((set, get) => ({
  shares: [],
  actions: {
    fetchData: async () => {
      try {
        const res = await api.get<Shares>('/listed-shares', {
          id: `listed-shares`,
          params: {
            page: 1,
            size: 15,
          },
        });

        set({ shares: res.data.items });
      } catch (e) {
        set({ shares: [] });

        throw e;
      }
    },
  },
}));

export const useShareState = () => store().shares;

export const useShareActions = () => store().actions;
