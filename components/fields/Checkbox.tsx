import { ChangeEvent } from "react";

type Props = {
  label: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Checkbox = ({ label, checked, onChange }: Props) => (
  <label>
    <input type="checkbox" defaultChecked={checked} onChange={onChange}></input>
    <span className="pl-3">{label}</span>
  </label>
);
