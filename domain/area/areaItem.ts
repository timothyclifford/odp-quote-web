import { customAlphabet } from "nanoid";

const id = customAlphabet("123456789", 4);

export const AREA_ITEM_NAMES = [
  "Internal door",
  "Glazed door",
  "External door",
  "Window",
  "Sash window",
  "Door frame",
  "Cupboard door (1 side)",
  "Addition preparation (1 hour)",
];

export type AreaItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export const BuildAreaItem = (name: string): AreaItem => ({
  id: id(),
  name,
  quantity: 0,
  price: 0,
});
