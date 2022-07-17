import { add } from "date-fns";
import fs from "fs";
import path from "path";

type CachedContent<T> = {
  expires: Date;
  data: Array<T>;
};

export const get = <T>(key: string): Array<T> | undefined => {
  try {
    const cached: CachedContent<T> = JSON.parse(
      fs.readFileSync(path.join(__dirname, key), "utf8")
    );
    if (cached !== undefined && new Date(cached.expires) > new Date()) {
      return cached.data;
    }
  } catch (error) {
    console.log("Cache is empty");
  }

  return undefined;
};

export const set = <T>(key: string, pricing: Array<T>) => {
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
