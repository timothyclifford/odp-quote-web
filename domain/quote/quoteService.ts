import { Quote } from "./quote";

const host = "http://localhost:3001/";

export const QuoteService = () => {
  return {
    getAll: (): Quote[] => {
      return [];
    },
    getById: (id: string): Quote | null => {
      return null;
    },
    createQuote: (quote: Quote): Quote => {
      return quote;
    },
    updateQuote: (quote: Quote): Quote => {
      return quote;
    },
  };
};
