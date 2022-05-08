import { PropsWithChildren } from "react";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

export const Layout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <main>
      <div className="container mx-auto py-5">
        <Navigation></Navigation>
        {children}
      </div>
      <Footer></Footer>
    </main>
  );
};
