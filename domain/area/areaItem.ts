import { customAlphabet } from "nanoid";
import { ItemPricing } from "../cms/cmsService";

const id = customAlphabet("123456789", 4);

export type AreaItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export const buildAreaItem = (
  name: string,
  pricing: Array<ItemPricing>
): AreaItem => ({
  id: id(),
  name,
  quantity: 1,
  price: pricing.find((p) => p.name === name)!.price,
});

export const calculateAreaItemPrice = (areaItem: AreaItem) =>
  areaItem.quantity * areaItem.price;
