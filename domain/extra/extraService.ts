import { HTTP_METHODS } from "../../lib/constants";
import { Extra } from "./extra";

const host = process.env.HOST ?? "http://localhost:3000";

export const ExtraService = () => {
  return {
    getQuoteExtras: async (quoteId: string): Promise<Array<Extra>> => {
      const response = await fetch(`${host}/api/quotes/${quoteId}/extras`, {
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
  };
};
