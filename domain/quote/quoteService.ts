import { HTTP_METHODS } from "../../constants";
import { Quote } from "./quote";

export const QuoteService = () => {
  const asJson = (quote: Quote) =>
    JSON.stringify({
      id: quote.id,
      firstName: quote.firstName,
      lastName: quote.lastName,
      email: quote.email,
      phone: quote.phone,
      street: quote.street,
      suburb: quote.suburb,
      postcode: quote.postcode,
    });
  return {
    getAll: async (): Promise<Array<Quote>> => {
      const response = await fetch(`/api/quotes`, {
        method: HTTP_METHODS.GET,
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      });
      if (response.ok) {
        return response.json();
      }
      return [];
    },
    getById: async (id: string): Promise<Quote | undefined> => {
      const response = await fetch(`/api/quotes/${id}`, {
        method: HTTP_METHODS.GET,
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      });
      if (response.ok) {
        return response.json();
      }
      return undefined;
    },
    createQuote: async (quote: Quote): Promise<Quote> => {
      const response = await fetch(`/api/quotes`, {
        method: HTTP_METHODS.POST,
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        body: asJson(quote),
      });
      if (response.ok) {
        throw new Error("Error creating quote");
      }
      return quote;
    },
    updateQuote: async (quote: Quote): Promise<Quote> => {
      const response = await fetch(`/api/quotes/${quote.id}`, {
        method: HTTP_METHODS.PUT,
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        body: asJson(quote),
      });
      if (response.ok) {
        throw new Error("Error updating quote");
      }
      return quote;
    },
  };
};
