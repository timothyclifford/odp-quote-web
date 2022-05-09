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
    { name: "inclusion1", included: true },
    { name: "inclusion2", included: true },
  ],
  exclusions: [
    { name: "exclusion1", included: false },
    { name: "exclusion2", included: false },
  ],
  comments: "",
  discountCode: "",
});
