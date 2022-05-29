import { GoogleSpreadsheet } from "google-spreadsheet";
import NodeCache from "node-cache";

export type AreaPricing = {
  name: string;
  price: number;
  ifCeilings: number;
  ifSkirting: number;
};
export type ItemPricing = { name: string; price: number };
export type ExtraPricing = { name: string; price: number };

export const PricingService = () => {
  const cache = new NodeCache({ stdTTL: 1800, checkperiod: 120 });
  const getPricingSpreadsheet = async () => {
    const spreadsheet = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!);
    await spreadsheet.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
      private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/gm, "\n"),
    });
    await spreadsheet.loadInfo();
    return spreadsheet;
  };
  return {
    getAreaPricing: async (): Promise<Array<AreaPricing>> => {
      const cached = cache.get<Array<AreaPricing>>("getAreaPricing");
      if (cached !== undefined) {
        console.log("Returning areas from cache");
        return cached;
      }

      console.log("No cache, fetching from API");

      const spreadsheet = await getPricingSpreadsheet();
      const sheet = spreadsheet.sheetsByTitle["Areas"];
      const rows = await sheet.getRows();
      const data = rows
        .filter(
          (r) => r["Name"] && r["Price"] && r["If ceilings"] && r["If skirting"]
        )
        .map((r) => ({
          name: r["Name"],
          price: parseFloat(r["Price"]),
          ifCeilings: parseFloat(r["If ceilings"]),
          ifSkirting: parseFloat(r["If skirting"]),
        }));

      cache.set<Array<AreaPricing>>("getAreaPricing", data);

      return data;
    },
    getItemPricing: async (): Promise<Array<ItemPricing>> => {
      const cached = cache.get<Array<ItemPricing>>("getItemPricing");
      if (cached !== undefined) {
        console.log("Returning items from cache");
        return cached;
      }

      console.log("No cache, fetching from API");

      const spreadsheet = await getPricingSpreadsheet();
      const sheet = spreadsheet.sheetsByTitle["Items"];
      const rows = await sheet.getRows();
      const data = rows
        .filter((r) => r["Name"] && r["Price"])
        .map((r) => ({ name: r["Name"], price: parseFloat(r["Price"]) }));

      cache.set<Array<ItemPricing>>("getItemPricing", data);

      return data;
    },
    getExtraPricing: async (): Promise<Array<ExtraPricing>> => {
      const cached = cache.get<Array<ExtraPricing>>("getExtraPricing");
      if (cached !== undefined) {
        console.log("Returning extras from cache");
        return cached;
      }

      console.log("No cache, fetching from API");

      const spreadsheet = await getPricingSpreadsheet();
      const sheet = spreadsheet.sheetsByTitle["Extras"];
      const rows = await sheet.getRows();
      const data = rows
        .filter((r) => r["Name"] && r["Price"])
        .map((r) => ({ name: r["Name"], price: parseFloat(r["Price"]) }));

      cache.set<Array<ExtraPricing>>("getExtraPricing", data);

      return data;
    },
  };
};
