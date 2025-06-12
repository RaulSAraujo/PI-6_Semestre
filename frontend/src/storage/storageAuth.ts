import { SignIn, UserClass } from "@models/sign-in";

import { AUTH_USER_STORAGE, AUTH_JWT_STORAGE } from "./storageConfig";

export async function storageAuthSave(auth: SignIn) {
  await localStorage.setItem(AUTH_USER_STORAGE, JSON.stringify(auth.user));

  await localStorage.setItem(
    AUTH_JWT_STORAGE,
    JSON.stringify(auth.access_token)
  );
}
export function storageAuthJwtGet() {
  const storage = localStorage.getItem(AUTH_JWT_STORAGE);

  const jwt: string = storage ? JSON.parse(storage) : "";

  return jwt;
}

export function storageAuthUserGet() {
  const storage = localStorage.getItem(AUTH_USER_STORAGE);

  const user: UserClass = storage ? JSON.parse(storage) : {};

  return user;
}

export async function storageAuthUserRemove() {
  localStorage.removeItem(AUTH_USER_STORAGE);
}

export async function storageAuthJwtRemove() {
  localStorage.removeItem(AUTH_JWT_STORAGE);
}
