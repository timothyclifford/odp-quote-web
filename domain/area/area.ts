import { AreaItem } from "./areaItem";

import { customAlphabet } from "nanoid";

const id = customAlphabet("123456789", 4);

export const AREA_NAMES = [
  "Bedroom",
  "Living area",
  "Bathroom",
  "Kitchen",
  "Hallway",
  "WIR",
  "Laundry",
  "Garage",
];

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
  price: 0,
  includeCeilings: false,
  includeSkirting: false,
  items: [],
  comment: "",
});
