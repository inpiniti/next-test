export const fetchToss = {
  // 연속 상승세를 보이는 주식 종목 리스트
  fetchRising: async () => {
    const response = await fetch(`/api/toss/rising`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("네트워크 응답이 올바르지 않습니다.");
    }
    const data = await response.json();
    return data;
  },
  // 2. 저평가 성장주
  fetchUndervaluedGrowth: async () => {
    const response = await fetch(`/api/toss/undervaluedGrowth`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("네트워크 응답이 올바르지 않습니다.");
    }
    const data = await response.json();
    return data;
  },

  // 3. 아직 저렴한 가치주
  fetchInexpensiveValue: async () => {
    const response = await fetch(`/api/toss/inexpensiveValue`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("네트워크 응답이 올바르지 않습니다.");
    }
    const data = await response.json();
    return data;
  },

  // 4. 꾸준한 배당주
  fetchConsistentDividend: async () => {
    const response = await fetch(`/api/toss/consistentDividend`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("네트워크 응답이 올바르지 않습니다.");
    }
    const data = await response.json();
    return data;
  },

  // 5. 돈 잘 버는 회사 찾기
  fetchProfitableCompanies: async () => {
    const response = await fetch(`/api/toss/profitableCompanies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("네트워크 응답이 올바르지 않습니다.");
    }
    const data = await response.json();
    return data;
  },

  // 6. 저평가 탈출
  fetchEscapingUndervalued: async () => {
    const response = await fetch(`/api/toss/escapingUndervalued`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("네트워크 응답이 올바르지 않습니다.");
    }
    const data = await response.json();
    return data;
  },

  // 7. 성장 기대주
  fetchGrowthExpectation: async () => {
    const response = await fetch(`/api/toss/growthExpectation`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("네트워크 응답이 올바르지 않습니다.");
    }
    const data = await response.json();
    return data;
  },

  // 8. 고수익 저평가
  fetchHighProfitUndervalued: async () => {
    const response = await fetch(`/api/toss/highProfitUndervalued`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("네트워크 응답이 올바르지 않습니다.");
    }
    const data = await response.json();
    return data;
  },

  // 9. 안정 성장주
  fetchStableGrowth: async () => {
    const response = await fetch(`/api/toss/stableGrowth`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("네트워크 응답이 올바르지 않습니다.");
    }
    const data = await response.json();
    return data;
  },
};
