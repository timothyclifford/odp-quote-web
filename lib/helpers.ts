import {
  AREA_ITEM_PRICES,
  AREA_NAMES,
  AREA_PRICES,
  EXTRA_PRICES,
} from "./constants";

const padTo2Digits = (value: number) => {
  return value.toString().padStart(2, "0");
};

export const formatDate = (date: Date) => {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join("/");
};

export const getAreaPrice = (name: string): number => {
  return AREA_PRICES.get(name) ?? 0;
};

export const getAreaItemPrice = (name: string): number => {
  return AREA_ITEM_PRICES.get(name) ?? 0;
};

export const getExtraPrice = (name: string): number => {
  return EXTRA_PRICES.get(name) ?? 0;
};
