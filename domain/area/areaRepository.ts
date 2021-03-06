import { Area } from "./area";

import { getFirestore } from "firebase-admin/firestore";
import { initialiseFirebase } from "../../firebase";

export const AreaRepository = () => {
  initialiseFirebase();
  const db = getFirestore();
  return {
    getAreasByQuoteId: async (
      quoteId: string
    ): Promise<Array<Area> | undefined> => {
      const quote = await db.collection("quotes").doc(quoteId).get();
      return quote.get("areas") ?? [];
    },
    updateQuoteAreas: async (quoteId: string, areas: Array<Area>) => {
      const quote = db.collection("quotes").doc(quoteId);
      await quote.set({ areas }, { merge: true });
    },
  };
};
