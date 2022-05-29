import { PropsWithChildren } from "react";

export const Heading3 = ({ children }: PropsWithChildren<{}>) => {
  return <h3 className="text-xl">{children}</h3>;
};
