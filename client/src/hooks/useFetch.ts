import axios from '../common/axios';

interface fetch {
  url: string;
  method?: 'POST' | 'GET' | 'DELETE' | 'PATCH' | 'PUT';
  data?: any;
  headers?: any;
}

export const useFetch =
  () =>
  async ({ url, method = 'GET', data = {}, headers = {} }: fetch) => {
    try {
      const resolved = await axios({ method, url, data, headers });
      return resolved.data;
    } catch (error: any) {
      return error.response.data;
    }
  };
