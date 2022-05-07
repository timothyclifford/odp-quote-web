import { Quote } from "./quote";

import { getFirestore } from "firebase-admin/firestore";
import { initialiseFirebase } from "../../firebase";

export const QuoteRepository = () => {
  initialiseFirebase();
  const db = getFirestore();
  return {
    getAllQuotes: async (): Promise<Array<Quote>> => {
      const collection = await db.collection("quotes").get();
      if (collection.empty) {
        return [];
      }
      return collection.docs.flatMap((d) => {
        return d.data() as Quote;
      });
    },
    getQuoteById: async (id: string): Promise<Quote | undefined> => {
      const doc = await db.collection("quotes").doc(id).get();
      return doc.data() as Quote;
    },
    createQuote: async (quote: Quote) => {
      const doc = db.collection("quotes").doc(quote.id);
      await doc.set(quote);
    },
    updateQuote: async (quote: Quote) => {
      const doc = db.collection("quotes").doc(quote.id);
      await doc.update(quote);
    },
    deleteQuote: async (id: string) => {
      await db.collection("quotes").doc(id).delete();
    },
  };
};
