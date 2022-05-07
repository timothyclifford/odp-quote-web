import { PropsWithChildren } from "react";
import Image from "next/image";
import logo from "../public/logo.webp";

export const Layout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div className="container max-w-2xl mx-auto py-5">
      <div className="w-96">
        <Image src={logo} alt="Picture of the author" />
      </div>
      {children}
    </div>
  );
};
