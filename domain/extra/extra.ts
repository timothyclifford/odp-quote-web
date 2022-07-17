import { customAlphabet } from "nanoid";
import { ExtraPricing } from "../cms/cmsService";

const id = customAlphabet("123456789", 4);

export type Extra = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  comment: string;
};

export const buildExtra = (
  name: string,
  pricing: Array<ExtraPricing>
): Extra => ({
  id: id(),
  name,
  quantity: 1,
  price: pricing.find((p) => p.name === name)!.price,
  comment: "",
});

export const calculateExtraPrice = (extra: Extra) =>
  extra.price * extra.quantity;
