import QuoteApp from "../../pages/_app";
import { Quote } from "./quote";

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
