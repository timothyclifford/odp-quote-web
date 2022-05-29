import { PropsWithChildren } from "react";

export const Heading1 = ({ children }: PropsWithChildren<{}>) => {
  return <h1 className="text-3xl">{children}</h1>;
};
