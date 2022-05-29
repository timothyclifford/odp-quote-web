import { PropsWithChildren } from "react";

export const HeadingWithAction = ({ children }: PropsWithChildren<{}>) => (
  <div className="flex items-center justify-between">{children}</div>
);
