import { PropsWithChildren } from "react";

export const Label = ({ children }: PropsWithChildren<{}>) => (
  <>
    {children && (
      <label>
        <span className="block mb-2 uppercase text-sm">{children}</span>
      </label>
    )}
  </>
);
