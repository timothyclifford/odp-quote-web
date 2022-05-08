import { PropsWithChildren } from "react";
import { Navigation } from "./Navigation";

export const Layout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div className="container mx-auto py-5">
      <Navigation></Navigation>
      {children}
    </div>
  );
};
