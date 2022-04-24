import { AreaItem } from "./areaItem";

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

export type Area = {
  id?: string;
  name: string;
  price: number;
  includeCeilings: boolean;
  includeSkirting: boolean;
  items: Array<AreaItem>;
  comment: string;
};

export const createArea = (): Area => ({
  name: "",
  price: 0,
  includeCeilings: false,
  includeSkirting: false,
  items: [],
  comment: "",
});
