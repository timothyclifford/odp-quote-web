import { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren<{}>) => {
  return <div className="container max-w-2xl mx-auto py-5">{children}</div>;
};
