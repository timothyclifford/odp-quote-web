import { Row } from "./Row";

export const InputField = ({
  id,
  label,
  type = "text",
  value,
  disabled = false,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}) => (
  <Row>
    <label className="label">
      <span className="label-text">{label}</span>
    </label>
    <input
      type={type}
      name={id}
      id={id}
      value={value}
      disabled={disabled}
      onChange={onChange ? (el) => onChange(el.target.value) : undefined}
      className="input input-bordered"
    />
  </Row>
);
