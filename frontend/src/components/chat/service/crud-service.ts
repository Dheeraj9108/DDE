const BASE_URL: string = "http://localhost:8080/flows";

const HEADERS = { "Content-Type": "application/json" };

export const CRUDService = {
  getFlows: async (nextCursor: string) => {
    const res = await fetch(
      `${BASE_URL}/paginated?cursor=${nextCursor}&limit=${15}`,
      {
        headers: HEADERS,
        method: "GET",
      },
    );

    return await res.json();
  },

  startDiagnosis: async (payload: any) => {
    const res = await fetch(`${BASE_URL}/startDiagnosis`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(payload),
    });

    return await res.json();
  },

  generateSystemResponse: async (payload: any) => {
    const resp = await fetch(`${BASE_URL}/nextQuestion`, {
      headers: HEADERS,
      method: "POST",
      body: JSON.stringify(payload),
    });
    return await resp.json();
  },

  generateSummary: async (sessionId: string) => {
    const res = await fetch(`${BASE_URL}/summary/${sessionId}`, {
      headers: HEADERS,
      method: "GET",
    });
    return await res.json();
  },
};
