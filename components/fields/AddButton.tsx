import { useState } from "react";

type Props = {
  label: string;
  options: Array<string>;
  onClick: (name: string) => void;
};

export const AddButton = ({ label, options, onClick }: Props) => {
  const [selected, setSelected] = useState("");
  const [error, setError] = useState(false);
  const add = () => {
    if (selected.length < 1) {
      setError(true);
      return;
    }
    onClick(selected);
  };
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <div className="input-group">
        <select
          className={`select select-bordered ${error ? "select-error" : ""}`}
          onChange={(e) => {
            setError(false);
            setSelected(e.target.value);
          }}
        >
          <option></option>
          {options.map((n) => {
            return <option key={n}>{n}</option>;
          })}
        </select>
        <button className="btn" onClick={add}>
          Add
        </button>
      </div>
    </div>
  );
};
