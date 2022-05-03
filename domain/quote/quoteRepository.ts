import { Quote } from "./quote";

import { getFirestore, Timestamp, FieldValue } from "firebase-admin/firestore";
import { initialiseFirebase } from "../../firebase";

export const QuoteRepository = () => {
  const app = initialiseFirebase();
  const db = getFirestore();
  return {
    getAllQuotes: async (): Promise<Array<Quote>> => {
      const docs = await db.collection("quotes").get();
      return docs.docs.flatMap((d) => {
        return d.data() as Quote;
      });
    },
    getQuoteById: async (id: string): Promise<Quote | undefined> => {
      const doc = await db.collection("quotes").doc(id).get();
      return doc.data() as Quote;
    },
    createQuote: async (quote: Quote) => {
      const docRef = db.collection("quotes").doc(quote.id);
      await docRef.set(quote);
    },
    updateQuote: async (quote: Quote) => {
      const docRef = db.collection("quotes").doc(quote.id);
      await docRef.update(quote);
    },
    deleteQuote: async (id: string) => {
      db.collection("quotes").doc(id).delete();
    },
  };
};
