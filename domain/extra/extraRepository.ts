import { getFirestore } from "firebase-admin/firestore";
import { initialiseFirebase } from "../../firebase";
import { Extra } from "./extra";

export const ExtraRepository = () => {
  initialiseFirebase();
  const db = getFirestore();
  return {
    getExtrasByQuoteId: async (
      quoteId: string
    ): Promise<Array<Extra> | undefined> => {
      const quote = await db.collection("quotes").doc(quoteId).get();
      return quote.get("extras") ?? [];
    },
    updateQuoteExtras: async (quoteId: string, extras: Array<Extra>) => {
      const quote = db.collection("quotes").doc(quoteId);
      await quote.set({ extras: extras }, { merge: true });
    },
  };
};
