import { PropsWithChildren } from "react";

export const Card = ({ children }: PropsWithChildren<{}>) => (
  <div className="border border-pink-100 bg-white p-5 mb-5 rounded shadow">
    {children}
  </div>
);
