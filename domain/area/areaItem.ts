import { customAlphabet } from "nanoid";
import { getAreaItemPrice } from "../../lib/helpers";

const id = customAlphabet("123456789", 4);

export type AreaItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export const buildAreaItem = (name: string): AreaItem => ({
  id: id(),
  name,
  quantity: 0,
  price: getAreaItemPrice(name),
});
