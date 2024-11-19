import axios, { AxiosError, AxiosRequestHeaders } from 'axios';
import { getHeaders } from '@/api/utils';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BUSINESS_API_BASE_URL,
});

instance.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    ...getHeaders(),
  } as unknown as AxiosRequestHeaders;

  return config;
});

export function isAxiosError<ResponseType>(
  error: unknown
): error is AxiosError<ResponseType> {
  return axios.isAxiosError(error);
}

export default instance;
