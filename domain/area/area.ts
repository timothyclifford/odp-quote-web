import { AreaItem } from "./areaItem";

import { customAlphabet } from "nanoid";
import { getAreaPrice } from "../../lib/helpers";

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

export const buildArea = (name: string): Area => ({
  id: id(),
  name,
  price: getAreaPrice(name),
  includeCeilings: false,
  includeSkirting: false,
  items: [],
  comment: "",
});
