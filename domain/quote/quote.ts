import { customAlphabet } from "nanoid";
import { Area } from "../area/area";
import { Extra } from "../extra/extra";
import { Inclusions } from "../inclusions/inclusion";

const id = customAlphabet("123456789", 8);

export type Quote = {
  id: string;
  salesPerson: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  suburb: string;
  postcode: string;
  created: string;
  updated: string;
};

export type DetailedQuote = Quote & {
  areas: Array<Area>;
  extras: Array<Extra>;
  inclusions: Inclusions;
};

export type QuoteMutation = Omit<Quote, "created" | "updated">;

export const buildQuote = (salesPerson: string): QuoteMutation => ({
  id: id(),
  salesPerson,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  street: "",
  suburb: "",
  postcode: "",
});

export const stubQuote = (): Quote => ({
  id: id(),
  salesPerson: "Oscar",
  firstName: "Bob",
  lastName: "Bobson",
  email: "bob@bobson.com",
  phone: "0400000000",
  street: "123 Bob St",
  suburb: "Bobville",
  postcode: "3210",
  created: "01/01/2022",
  updated: "01/01/2022",
});
