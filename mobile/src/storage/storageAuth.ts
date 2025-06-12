import { Auth as AuthDTO, FormSignIn } from '@dtos/LoginDTO';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AUTH_STORAGE } from './storageConfig';

export async function storageAuthSave(auth: AuthDTO & FormSignIn) {
  await AsyncStorage.setItem(AUTH_STORAGE, JSON.stringify(auth));
}

export async function storageAuthGet() {
  const storage = await AsyncStorage.getItem(AUTH_STORAGE);

  const user: AuthDTO & FormSignIn = storage ? JSON.parse(storage) : {};

  return user;
}

export async function storageAuthRemove() {
  await AsyncStorage.removeItem(AUTH_STORAGE);
}
