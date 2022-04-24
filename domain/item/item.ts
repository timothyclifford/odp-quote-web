export const ITEM_NAMES = [
  "Furniture relocation",
  "Kitchen cabinets",
  "Wall only",
  "Ceiling only",
  "Fireplace",
  "Ceiling rose",
];

export type Item = {
  name: string;
  quantity: number;
  price: number;
  comment: string;
};
