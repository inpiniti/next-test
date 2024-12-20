import { TBuy } from "@/interface/TBuy";

export const fetchBuy = {
  get: async (id: string) => {
    try {
      const response = await fetch(`api/buy?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        return [{}];
      } else {
        const data = await response.json();
        return data;
      }
    } catch {
      return {};
    }
  },
  post: async (body: TBuy) => {
    const response = await fetch(`api/buy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error("네트워크 응답이 올바르지 않습니다.");
    }
    const data = await response.json();
    return data;
  },
  put: async (body: TBuy) => {
    const response = await fetch(`api/buy`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error("네트워크 응답이 올바르지 않습니다.");
    }
    const data = await response.json();
    return data;
  },
  delete: async (body: TBuy) => {
    const response = await fetch(`api/buy`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error("네트워크 응답이 올바르지 않습니다.");
    }
  },
};
