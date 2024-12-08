import { TInterest } from '@/interface/TInterest';

export const fetchInterest = {
  get: async () => {
    const response = await fetch(`api/interest`);
    if (!response.ok) {
      throw new Error('네트워크 응답이 올바르지 않습니다.');
    }
    const data = await response.json();
    return data;
  },
  post: async (body: TInterest) => {
    const response = await fetch(`api/interest`, {
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
  put: async (body: TInterest) => {
    const response = await fetch(`api/interest`, {
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
    const response = await fetch(`api/interest`, {
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