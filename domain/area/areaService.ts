import { HTTP_METHODS } from "../../lib/constants";
import { Area } from "./area";

const host = process.env.HOST ?? "http://localhost:3000";

export const AreaService = () => ({
  getQuoteAreas: async (quoteId: string): Promise<Array<Area>> => {
    const response = await fetch(`${host}/api/quotes/${quoteId}/areas`, {
      method: HTTP_METHODS.GET,
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
    if (response.ok) {
      return await response.json();
    }
    return [];
  },
});
