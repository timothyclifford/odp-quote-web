import { add, isAfter } from "date-fns";
import fs from "fs";
import path from "path";

type CachedPricing<T> = {
  expires: Date;
  pricing: Array<T>;
};

export const getCachedPricing = <T>(key: string): Array<T> | undefined => {
  try {
    const cached: CachedPricing<T> = JSON.parse(
      fs.readFileSync(path.join(__dirname, key), "utf8")
    );
    if (cached !== undefined && new Date(cached.expires) > new Date()) {
      return cached.pricing;
    }
  } catch (error) {
    console.log("Cache is empty");
  }

  return undefined;
};

export const setCachedPricing = <T>(key: string, pricing: Array<T>) => {
  try {
    const expires = add(new Date(), { hours: 2 });
    fs.writeFileSync(
      path.join(__dirname, key),
      JSON.stringify({ expires, pricing }),
      "utf8"
    );
  } catch (error) {
    console.log("Error writing to cache");
    console.log(error);
  }
};
