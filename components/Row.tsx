import { PropsWithChildren } from "react";

export const Row = ({ children }: PropsWithChildren<{}>) => (
  <div className="mb-4">{children}</div>
);
