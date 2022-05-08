import { useCallback, useEffect, useState } from "react";

type Props = {
  label?: string;
  quantity: number;
  onSave: (quantity: number) => void;
};

export const QuantityField = ({ label, quantity, onSave }: Props) => {
  const [value, setValue] = useState(quantity);
  useEffect(() => {
    console.log("Saving...");
    onSave(value);
  }, [value]);
  return (
    <div className="form-control">
      {label && (
        <label className="label">
          <span className="label-text">Quantity</span>
        </label>
      )}
      <div className="flex">
        <button
          className="btn"
          onClick={() => (value > 0 ? setValue(value - 1) : undefined)}
        >
          -
        </button>
        <input
          type="text"
          className="input input-bordered w-14 mx-3 text-center rounded"
          value={value}
          readOnly
        ></input>
        <button className="btn" onClick={() => setValue(value + 1)}>
          +
        </button>
      </div>
    </div>
  );
};
