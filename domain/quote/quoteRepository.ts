import { QuoteMutation, Quote, DetailedQuote } from "./quote";

import { getFirestore } from "firebase-admin/firestore";
import { initialiseFirebase } from "../../firebase";
import { formatDate } from "../../lib/helpers";

export const QuoteRepository = () => {
  initialiseFirebase();
  const db = getFirestore();
  return {
    getAllQuotes: async (): Promise<Array<Quote>> => {
      const collection = await db.collection("quotes").get();
      if (collection.empty) {
        return [];
      }
      return collection.docs.flatMap((doc) => {
        return {
          ...(doc.data() as Quote),
          created: formatDate(doc.createTime.toDate()),
          updated: formatDate(doc.updateTime.toDate()),
        };
      });
    },
    getQuoteById: async (id: string): Promise<Quote | undefined> => {
      const doc = await db.collection("quotes").doc(id).get();
      if (!doc.exists) {
        return undefined;
      }
      return {
        ...(doc.data() as Quote),
        created: formatDate(doc.createTime?.toDate() ?? new Date()),
        updated: formatDate(doc.updateTime?.toDate() ?? new Date()),
      };
    },
    getDetailedQuoteById: async (
      id: string
    ): Promise<DetailedQuote | undefined> => {
      const doc = await db.collection("quotes").doc(id).get();
      if (!doc.exists) {
        return undefined;
      }
      return {
        ...(doc.data() as DetailedQuote),
        created: formatDate(doc.createTime?.toDate() ?? new Date()),
        updated: formatDate(doc.updateTime?.toDate() ?? new Date()),
      };
    },
    createQuote: async (quote: QuoteMutation) => {
      const doc = db.collection("quotes").doc(quote.id);
      await doc.set(quote);
      const updated = await doc.get();
      return {
        ...(updated.data() as Quote),
        created: formatDate(updated.createTime?.toDate() ?? new Date()),
        updated: formatDate(updated.updateTime?.toDate() ?? new Date()),
      };
    },
    updateQuote: async (quote: QuoteMutation) => {
      const doc = db.collection("quotes").doc(quote.id);
      await doc.update(quote);
      const updated = await doc.get();
      return {
        ...(updated.data() as Quote),
        created: formatDate(updated.createTime?.toDate() ?? new Date()),
        updated: formatDate(updated.updateTime?.toDate() ?? new Date()),
      };
    },
    deleteQuote: async (id: string) => {
      await db.collection("quotes").doc(id).delete();
    },
  };
};
