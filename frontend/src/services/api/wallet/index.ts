import { InvestmentPortfolio } from "@models/investment-portfolio";

import { Api } from "../axios-config";

type params = {
  page?: number;
};

async function get({ page = 1 }: params) {
  try {
    const { data } = await Api.get<InvestmentPortfolio>(
      "/investment-portfolio",
      {
        id: `list-investment-portfolio-${page}`,
        params: {
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

export const WalletService = {
  get,
};
