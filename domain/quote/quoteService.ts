import { HTTP_METHODS } from "../../lib/constants";
import { QuoteMutation, Quote } from "./quote";

const host = process.env.HOST ?? "http://localhost:3000";

export const QuoteService = () => {
  return {
    getAll: async (): Promise<Array<Quote>> => {
      const response = await fetch(`${host}/api/quotes`, {
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
    getById: async (id: string): Promise<Quote | undefined> => {
      const response = await fetch(`${host}/api/quotes/${id}`, {
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
    createQuote: async (quote: QuoteMutation): Promise<Quote> => {
      const response = await fetch(`${host}/api/quotes`, {
        method: HTTP_METHODS.POST,
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(quote),
      });
      if (response.ok) {
        throw new Error("Error creating quote");
      }
      return response.json();
    },
    updateQuote: async (quote: QuoteMutation): Promise<Quote> => {
      const response = await fetch(`${host}/api/quotes/${quote.id}`, {
        method: HTTP_METHODS.PUT,
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(quote),
      });
      if (response.ok) {
        throw new Error("Error updating quote");
      }
      return response.json();
    },
  };
};
