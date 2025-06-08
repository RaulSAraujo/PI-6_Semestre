import { Api } from "../axios-config";
import { ListedShares } from "@models/listed-shares";

async function getAll() {
  try {
    const { data } = await Api.get<ListedShares>("/listed-shares");

    return data;
  } catch (error) {
    throw error;
  }
}

// const getById = async (id: string): Promise<TPessoasComTotalCount | Error> => {
//   try {
//     const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);

//     if (!accessToken) {
//       return new Error("Token de autenticação não encontrado.");
//     }

//     let urlRelativa = `/listed-shares/${id}`;

//     const { data, headers } = await Api.get(urlRelativa, {
//       headers: {
//         Authorization: accessToken,
//       },
//     });
//     if (data) {
//       return {
//         data,
//         totalCount: Number(
//           headers["x-total-count"] || Environment.LIMITE_DE_LINHAS
//         ),
//       };
//     }

//     console.log(data);

//     return new Error("Erro ao listar os registros.");
//   } catch (error) {
//     console.error(error);
//     return new Error(
//       (error as { message: string }).message || "Erro ao listar os registros."
//     );
//   }
// };

// const create = async (
//   dados: Omit<IDetalhelistedshares, "id">
// ): Promise<number | Error> => {
//   try {
//     const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);

//     if (!accessToken) {
//       return new Error("Token de autenticação não encontrado.");
//     }

//     const { data } = await Api.post<IDetalhelistedshares>(
//       "/listed-shares",
//       dados,
//       {
//         headers: {
//           Authorization: accessToken,
//         },
//       }
//     );

//     if (data) {
//       return data.id;
//     }

//     return new Error("Erro ao criar o registro.");
//   } catch (error) {
//     console.error(error);
//     return new Error(
//       (error as { message: string }).message || "Erro ao criar o registro."
//     );
//   }
// };

export const ActionB3Service = {
  getAll,
};
