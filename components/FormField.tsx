export const FormField = ({
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
  <div>
    <div>{label}</div>
    <input
      type={type}
      name={id}
      id={id}
      value={value}
      disabled={disabled}
      onChange={onChange ? (el) => onChange(el.target.value) : undefined}
    />
  </div>
);
