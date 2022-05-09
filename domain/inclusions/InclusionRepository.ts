import { getFirestore } from "firebase-admin/firestore";
import { initialiseFirebase } from "../../firebase";
import { Inclusion } from "./inclusion";

export const InclusionRepository = () => {
  initialiseFirebase();
  const db = getFirestore();
  return {
    getInclusionsByQuoteId: async (
      quoteId: string
    ): Promise<Array<Inclusion> | undefined> => {
      const quote = await db.collection("quotes").doc(quoteId).get();
      if (quote.exists) {
        return quote.get("inclusions");
      }
      return undefined;
    },
    updateQuoteInclusions: async (
      quoteId: string,
      inclusions: Array<Inclusion>
    ) => {
      const quote = db.collection("quotes").doc(quoteId);
      await quote.set({ inclusions: inclusions }, { merge: true });
    },
  };
};
