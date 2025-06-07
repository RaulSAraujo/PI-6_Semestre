import { Client, Item } from "@models/client";

import { Api } from "../axios-config";

async function getAll() {
  try {
    const { data } = await Api.get<Client>("/clients");

    return data;
  } catch (error) {
    throw error;
  }
}

async function create(form: Item) {
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

async function getById(id: number) {
  try {
    const { data } = await Api.get(`/Doctor/${id}`);

    return data;
  } catch (error) {
    throw error;
  }
}

export const ClientesService = {
  getAll,
  create,
  getById,
};
