import { HTTP_METHODS } from "../../constants";
import { Quote } from "./quote";

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
    createQuote: async (quote: Quote): Promise<Quote> => {
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
      return quote;
    },
    updateQuote: async (quote: Quote): Promise<Quote> => {
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
      return quote;
    },
  };
};
