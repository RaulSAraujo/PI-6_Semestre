import { Api } from "../axios-config";

import { Profiles } from "@models/profiles";

async function getAll() {
  try {
    const { data } = await Api.get<Profiles>("/profiles");

    return data;
  } catch (error) {
    throw error;
  }
}

async function getById(id: string) {
  try {
    const { data } = await Api.get<Profiles>(`/profiles/${id}`);

    return data;
  } catch (error) {
    throw error;
  }
}

export const ProfileService = {
  getAll,
  getById,
};
