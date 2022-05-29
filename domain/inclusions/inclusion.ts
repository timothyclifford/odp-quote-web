import { customAlphabet } from "nanoid";

const id = customAlphabet("123456789", 4);

export type Inclusion = {
  name: string;
  included: boolean;
};

export type Inclusions = {
  id: string;
  inclusions: Array<Inclusion>;
  exclusions: Array<Inclusion>;
  comments: string;
  discountCode: string;
};

export const buildInclusions = (): Inclusions => ({
  id: id(),
  inclusions: [
    { name: "Minor patching", included: false },
    { name: "10 year warranty", included: false },
  ],
  exclusions: [
    { name: "Aluminium windows", included: false },
    { name: "Carptet cleaning", included: false },
  ],
  comments: "",
  discountCode: "",
});
