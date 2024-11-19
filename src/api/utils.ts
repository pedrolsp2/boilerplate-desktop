import { getItem } from '@/utils/storage';

export const getHeaders = () => {
  return {
    'x-access-token': getItem(localStorage, 'token'),
    'x-sistema': 'GMAN',
    'x-versao': import.meta.env.VITE_VERSION,
    // 'x-sistema': 'DESKTOP',
  };
};
