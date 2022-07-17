import { GoogleSpreadsheet } from "google-spreadsheet";
import { getEnvironmentConfiguration } from "../../lib/environmentConfiguration";
import { get, set } from "./cmsCache";

export type AreaPricing = {
  name: string;
  price: number;
  ifCeilings: number;
  ifSkirting: number;
};
export type ItemPricing = { name: string; price: number };
export type ExtraPricing = { name: string; price: number };
export type Inclusion = { name: string; default: boolean };

export const CMSService = () => {
  const env = getEnvironmentConfiguration();
  const getPricingSpreadsheet = async () => {
    const spreadsheet = new GoogleSpreadsheet(env.GOOGLE_SHEET_ID!);
    await spreadsheet.useServiceAccountAuth({
      client_email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
      private_key: env.GOOGLE_PRIVATE_KEY!.replace(/\\n/gm, "\n"),
    });
    await spreadsheet.loadInfo();

    return spreadsheet;
  };
  return {
    getAreaPricing: async (): Promise<Array<AreaPricing>> => {
      const cached = get<AreaPricing>("getAreaPricing");
      if (cached !== undefined) {
        return cached;
      }

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

      set("getAreaPricing", data);

      return data;
    },
    getItemPricing: async (): Promise<Array<ItemPricing>> => {
      const cached = get<ItemPricing>("getItemPricing");
      if (cached !== undefined) {
        return cached;
      }

      const spreadsheet = await getPricingSpreadsheet();
      const sheet = spreadsheet.sheetsByTitle["Items"];
      const rows = await sheet.getRows();
      const data = rows
        .filter((r) => r["Name"] && r["Price"])
        .map((r) => ({ name: r["Name"], price: parseFloat(r["Price"]) }));

      set("getItemPricing", data);

      return data;
    },
    getExtraPricing: async (): Promise<Array<ExtraPricing>> => {
      const cached = get<ExtraPricing>("getExtraPricing");
      if (cached !== undefined) {
        return cached;
      }

      const spreadsheet = await getPricingSpreadsheet();
      const sheet = spreadsheet.sheetsByTitle["Extras"];
      const rows = await sheet.getRows();
      const data = rows
        .filter((r) => r["Name"] && r["Price"])
        .map((r) => ({ name: r["Name"], price: parseFloat(r["Price"]) }));

      set("getExtraPricing", data);

      return data;
    },
    getInclusions: async (): Promise<Array<Inclusion>> => {
      const cached = get<Inclusion>("getInclusions");
      if (cached !== undefined) {
        return cached;
      }

      const spreadsheet = await getPricingSpreadsheet();
      const sheet = spreadsheet.sheetsByTitle["Inclusions"];
      const rows = await sheet.getRows();
      const data = rows
        .filter((r) => r["Name"] && r["Default"])
        .map((r) => ({
          name: r["Name"],
          default: r["Default"].toLowerCase() === "true",
        }));

      set("getInclusions", data);

      return data;
    },
    getExclusions: async (): Promise<Array<Inclusion>> => {
      const cached = get<Inclusion>("getExclusions");
      if (cached !== undefined) {
        return cached;
      }

      const spreadsheet = await getPricingSpreadsheet();
      const sheet = spreadsheet.sheetsByTitle["Exclusions"];
      const rows = await sheet.getRows();
      const data = rows
        .filter((r) => r["Name"] && r["Default"])
        .map((r) => ({
          name: r["Name"],
          default: r["Default"].toLowerCase() === "true",
        }));

      set("getExclusions", data);

      return data;
    },
  };
};
