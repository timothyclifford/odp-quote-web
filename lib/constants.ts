export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

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

export const AREA_PRICES = new Map<string, number>([
  ["Bedroom", 100],
  ["Living area", 100],
  ["Bathroom", 100],
  ["Kitchen", 100],
  ["Hallway", 100],
  ["WIR", 100],
  ["Laundry", 100],
  ["Garage", 100],
]);

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

export const AREA_ITEM_PRICES = new Map<string, number>([
  ["Internal door", 50],
  ["Glazed door", 50],
  ["External door", 50],
  ["Window", 50],
  ["Sash window", 50],
  ["Door frame", 50],
  ["Cupboard door (1 side)", 50],
  ["Addition preparation (1 hour)", 50],
]);

export const EXTRA_NAMES = [
  "Furniture relocation",
  "Kitchen cabinets",
  "Wall only",
  "Ceiling only",
  "Fireplace",
  "Ceiling rose",
];

export const EXTRA_PRICES = new Map<string, number>([
  ["Furniture relocation", 75],
  ["Kitchen cabinets", 75],
  ["Wall only", 75],
  ["Ceiling only", 75],
  ["Fireplace", 75],
  ["Ceiling rose", 75],
]);
