import { TSales } from '@/interface/TSales';

export const fetchSales = {
  get: async (id: string) => {
    const response = await fetch(`api/sales?id=${id}`);
    if (!response.ok) {
      throw new Error('네트워크 응답이 올바르지 않습니다.');
    }
    const data = await response.json();
    return data;
  },
  post: async (body: TSales) => {
    const response = await fetch(`api/sales`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error('네트워크 응답이 올바르지 않습니다.');
    }
    const data = await response.json();
    return data;
  },
  put: async (body: TSales) => {
    const response = await fetch(`api/sales`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error('네트워크 응답이 올바르지 않습니다.');
    }
    const data = await response.json();
    return data;
  },
  delete: async (key: number) => {
    const response = await fetch(`api/sales`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key }),
    });
    if (!response.ok) {
      throw new Error('네트워크 응답이 올바르지 않습니다.');
    }
  },
};
