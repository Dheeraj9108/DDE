const BASE_URL: string = "http://localhost:8080/tickets";

const HEADERS = { "Content-Type": "application/json" };

export const CRUDService = {
  getAllTickets: async (userId: string) => {
    const res = await fetch(`${BASE_URL}?userId=${userId}`, {
      headers: HEADERS,
      method: "GET",
    });
    return await res.json();
  },

  getTicketById: async (id:string) => {
    const res = fetch(`${BASE_URL}/${id}`,{
        headers:HEADERS,
        method:"GET"
    });
    return (await res).json();
  },

  createTicket: async (payload: any) => {
    const res = await fetch(BASE_URL, {
      headers: HEADERS,
      method: "POST",
      body: JSON.stringify(payload),
    });
    return await res.json();
  },
};
