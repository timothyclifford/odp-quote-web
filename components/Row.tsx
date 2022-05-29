import { PropsWithChildren } from "react";

export const Row = ({ children }: PropsWithChildren<{}>) => (
  <div className="mb-5">{children}</div>
);
