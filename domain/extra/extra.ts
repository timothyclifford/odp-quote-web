export const EXTRA_NAMES = [
  "Furniture relocation",
  "Kitchen cabinets",
  "Wall only",
  "Ceiling only",
  "Fireplace",
  "Ceiling rose",
];

export type Extra = {
  id?: string;
  name: string;
  quantity: number;
  price: number;
  comment: string;
};

export const createExtra = (): Extra => ({
  name: "",
  quantity: 0,
  price: 0,
  comment: "",
});
