import { AreaItem, calculateAreaItemPrice } from "./areaItem";

import { customAlphabet } from "nanoid";
import { AreaPricing } from "../cms/cmsService";

const id = customAlphabet("123456789", 4);

export type Area = {
  id: string;
  name: string;
  price: number;
  includeCeilings: boolean;
  includeCeilingsPrice: number;
  includeSkirting: boolean;
  includeSkirtingPrice: number;
  items: Array<AreaItem>;
  comment: string;
};

export const buildArea = (name: string, pricing: AreaPricing[]): Area => ({
  id: id(),
  name,
  price: pricing.find((p) => p.name === name)!.price,
  includeCeilings: false,
  includeCeilingsPrice: pricing.find((p) => p.name === name)!.ifCeilings,
  includeSkirting: false,
  includeSkirtingPrice: pricing.find((p) => p.name === name)!.ifSkirting,
  items: [],
  comment: "",
});

export const calculateAreaPrice = (area: Area) => {
  return (
    area.price +
    (area.includeCeilings ? area.includeCeilingsPrice : 0) +
    (area.includeSkirting ? area.includeSkirtingPrice : 0)
  );
};

export const calculateAreaTotalPrice = (area: Area) => {
  let itemsPrice = 0;
  if (area.items.length > 0) {
    itemsPrice = area.items
      .map(calculateAreaItemPrice)
      .reduce((previous, next) => previous + next);
  }
  return calculateAreaPrice(area) + itemsPrice;
};
