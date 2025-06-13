import { create } from 'zustand';

import { api } from '@services/api';
import { Investment, Item } from '@dtos/InvestmentDTO';

interface Store {
  investments: Item[];
  actions: {
    fetchData: () => Promise<void>;
  };
}

const store = create<Store>((set, get) => ({
  investments: [],
  actions: {
    fetchData: async () => {
      try {
        const res = await api.get<Investment>('/investment-portfolio', {
          id: `investment-portfolio`,
          cache: false,
          params: {
            page: 1,
            size: 15,
          },
        });

        set({ investments: res.data.items });
      } catch (e) {
        set({ investments: [] });

        throw e;
      }
    },
  },
}));

export const useWalletState = () => store().investments;

export const useWalletActions = () => store().actions;
