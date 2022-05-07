import { customAlphabet } from "nanoid";

const id = customAlphabet("123456789", 8);

export type Quote = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  suburb: string;
  postcode: string;
};

export const buildQuote = (): Quote => ({
  id: id(),
  firstName: "Bob",
  lastName: "Bobson",
  email: "bob@bobson.com",
  phone: "0400000000",
  street: "123 Bob St",
  suburb: "Bobville",
  postcode: "3210",
});

export const stubQuote = (): Quote => ({
  id: id(),
  firstName: "Bob",
  lastName: "Bobson",
  email: "bob@bobson.com",
  phone: "0400000000",
  street: "123 Bob St",
  suburb: "Bobville",
  postcode: "3210",
});
