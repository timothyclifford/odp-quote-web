import { customAlphabet } from "nanoid";

const id = customAlphabet("123456789", 4);

export const EXTRA_NAMES = [
  "Furniture relocation",
  "Kitchen cabinets",
  "Wall only",
  "Ceiling only",
  "Fireplace",
  "Ceiling rose",
];

export type Extra = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  comment: string;
};

export const BuildExtra = (name: string): Extra => ({
  id: id(),
  name,
  quantity: 0,
  price: 0,
  comment: "",
});
