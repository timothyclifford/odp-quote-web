import { customAlphabet } from "nanoid";
import { getExtraPrice } from "../../lib/helpers";

const id = customAlphabet("123456789", 4);

export type Extra = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  comment: string;
};

export const buildExtra = (name: string): Extra => ({
  id: id(),
  name,
  quantity: 0,
  price: getExtraPrice(name),
  comment: "",
});
