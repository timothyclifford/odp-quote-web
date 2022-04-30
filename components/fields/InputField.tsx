export const InputField = ({
  label,
  groupLabel,
  type = "text",
  value,
  placeholder,
  disabled = false,
  onChange,
}: {
  label: string;
  groupLabel?: string;
  type?: string;
  value?: string | number;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}) => (
  <>
    <label className="label">
      <span className="label-text">{label}</span>
    </label>
    {groupLabel ? (
      <label className="input-group">
        <span>{groupLabel}</span>
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange ? (el) => onChange(el.target.value) : undefined}
          className="input input-bordered"
        />
      </label>
    ) : (
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange ? (el) => onChange(el.target.value) : undefined}
        className="input input-bordered"
      />
    )}
  </>
);
