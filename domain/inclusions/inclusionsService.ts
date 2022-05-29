import { HTTP_METHODS } from "../../lib/constants";
import { Inclusions } from "./inclusion";

const host = process.env.HOST ?? "http://localhost:3000";

export const InclusionsService = () => ({
  getQuoteInclusions: async (
    quoteId: string
  ): Promise<Inclusions | undefined> => {
    const response = await fetch(`${host}/api/quotes/${quoteId}/inclusions`, {
      method: HTTP_METHODS.GET,
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
    if (response.ok) {
      return await response.json();
    }
    return undefined;
  },
});
