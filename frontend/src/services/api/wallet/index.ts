import { Api } from "../axios-config";
import { InvestmentPortfolio } from "@models/investment-portfolio";

const LOCAL_STORAGE_KEY__ACCESS_TOKEN = "APP_ACCESS_TOKEN";

async function getAll() {
  try {
    const { data } = await Api.get<InvestmentPortfolio>(
      "/investment-portfolio"
    );

    return data;
  } catch (error) {
    throw error;
  }
}

const getById = async (id: number): Promise<IDetalheCliente | Error> => {
  try {
    const { data } = await Api.get(`/Doctor/${id}`);

    if (data) {
      return data;
    }

    return new Error("Erro ao consultar o registro.");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao consultar o registro."
    );
  }
};

const create = async (
  dados: Omit<IDetalheCliente, "id">
): Promise<number | Error> => {
  try {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);

    if (!accessToken) {
      return new Error("Token de autenticação não encontrado.");
    }

    const { data } = await Api.post<IDetalheCliente>(
      "/investment-portfolio",
      dados,
      {
        headers: {
          Authorization: accessToken,
        },
      }
    );

    if (data) {
      return data.id;
    }

    return new Error("Erro ao criar o registro.");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao criar o registro."
    );
  }
};

export const CarteiraService = {
  getAll,
  create,
  getById,
};
