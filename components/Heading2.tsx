import { PropsWithChildren } from "react";

export const Heading2 = ({ children }: PropsWithChildren<{}>) => {
  return <h2 className="text-2xl">{children}</h2>;
};
