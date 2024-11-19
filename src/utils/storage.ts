export const setItem = (storage: Storage, key: string, value: string) =>
  storage.setItem(key, value);

export const getItem = (Storage: Storage, key: string) => Storage.getItem(key);

export const removeItem = (storage: Storage, key: string) =>
  storage.removeItem(key);
