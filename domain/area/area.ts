export const AREA_NAMES = [
  "Bedroom",
  "Living area",
  "Bathroom",
  "Kitchen",
  "Hallway",
  "WIR",
  "Laundy",
  "Garage",
];

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

export type Area = {
  name: string;
  price: number;
  includeCeilings: boolean;
  includeSkirting: boolean;
  items: Array<AreaItem>;
  comment: string;
};

export type AreaItem = {
  name: string;
  quantity: number;
  price: number;
};
