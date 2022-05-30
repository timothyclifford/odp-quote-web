import { HTTP_METHODS } from "../../lib/constants";
import { QuoteMutation, Quote, DetailedQuote } from "./quote";

const host = process.env.NEXT_PUBLIC_HOST ?? "http://localhost:3000";

export const QuoteService = () => ({
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
  getDetailedQuote: async (id: string): Promise<DetailedQuote | undefined> => {
    const response = await fetch(`${host}/api/quotes/${id}/detailed`, {
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
      return response.json();
    }
    throw new Error("Error creating quote");
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
      return response.json();
    }
    throw new Error("Error updating quote");
  },
});
