import { useCallback, useEffect, useState } from "react";

type Props = {
  quantity: number;
  onSave: (quantity: number) => void;
};

export const QuantityField = ({ quantity, onSave }: Props) => {
  const [value, setValue] = useState(quantity);
  useEffect(() => {
    console.log("Saving...");
    onSave(value);
  }, [value]);
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">Quantity</span>
      </label>
      <div className="input-group">
        <button
          className="btn btn-square"
          onClick={() => (value > 0 ? setValue(value - 1) : undefined)}
        >
          -
        </button>
        <input
          type="text"
          className="input input-bordered w-14 text-center"
          value={value}
          readOnly
        ></input>
        <button className="btn btn-square" onClick={() => setValue(value + 1)}>
          +
        </button>
      </div>
    </div>
  );
};
