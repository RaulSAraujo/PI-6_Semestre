import { Client, Item } from "@models/client";

import { Api } from "../axios-config";

async function get() {
  try {
    const { data } = await Api.get<Client>("/clients");

    return data;
  } catch (error) {
    throw error;
  }
}

async function create(form: Partial<Item>) {
  try {
    const { data } = await Api.post<Item>("/clients", form);

    return data;
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao criar o registro."
    );
  }
}

export const ClientesService = {
  get,
  create,
};
