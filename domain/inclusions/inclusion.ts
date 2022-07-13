import { customAlphabet } from "nanoid";

const id = customAlphabet("123456789", 4);

export type Inclusion = {
  name: string;
  default: boolean;
};

export type Inclusions = {
  id: string;
  inclusions: Array<Inclusion>;
  exclusions: Array<Inclusion>;
  comments: string;
  discount: number;
};

export const buildInclusions = (
  inclusions: Array<Inclusion>,
  exclusions: Array<Inclusion>
): Inclusions => ({
  id: id(),
  inclusions: inclusions,
  exclusions: exclusions,
  comments: "",
  discount: 0,
});
