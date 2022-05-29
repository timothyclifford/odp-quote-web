import { useState } from "react";
import { Label } from "./Label";

type Props = {
  label?: string;
  quantity: number;
  onSave: (quantity: number) => void;
};

export const QuantityField = ({ label, quantity, onSave }: Props) => {
  const [value, setValue] = useState(quantity);
  const decrement = () => {
    if (value > 1) {
      setValue(value - 1);
      onSave(value);
    }
  };
  const increment = () => {
    setValue(value + 1);
    onSave(value);
  };
  return (
    <>
      <Label>{label}</Label>
      <div className="flex">
        <button className="btn btn-quanity" onClick={() => decrement()}>
          -
        </button>
        <input
          type="text"
          className="border border-gray-200 bg-gray-50 w-12 mx-3 text-center"
          inputMode="numeric"
          pattern="[0-9]*"
          value={value}
          readOnly
        ></input>
        <button className="btn btn-quanity" onClick={() => increment()}>
          +
        </button>
      </div>
    </>
  );
};
