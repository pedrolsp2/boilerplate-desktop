export const useKeys = <T>(value: string) => {
  const keys = {
    all: [value] as const,
    lists: () => [...keys.all, 'list'] as const,
    list: (page: number, perPage: number, filtro: string) =>
      [...keys.lists(), page, perPage, filtro] as const,
    details: () => [...keys.all, 'detail'] as const,
    detail: (params: { iditem: T }) => [...keys.details(), params] as const,
  };
  return keys;
};
