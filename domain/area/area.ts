import { AreaItem } from "./areaItem";

import { customAlphabet } from "nanoid";
import { AreaPricing } from "../pricing/pricingService";

const id = customAlphabet("123456789", 4);

export type Area = {
  id: string;
  name: string;
  price: number;
  includeCeilings: boolean;
  includeSkirting: boolean;
  items: Array<AreaItem>;
  comment: string;
};

export const buildArea = (name: string, pricing: AreaPricing[]): Area => ({
  id: id(),
  name,
  price: pricing.find((p) => p.name === name)!.price,
  includeCeilings: false,
  includeSkirting: false,
  items: [],
  comment: "",
});
