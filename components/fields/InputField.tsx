import { Label } from "./Label";

export const InputField = ({
  label,
  groupLabel,
  type = "text",
  value,
  required = false,
  placeholder,
  disabled = false,
  onChange,
}: {
  label?: string;
  groupLabel?: string;
  type?: string;
  value?: string | number;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}) => (
  <>
    <Label>{label}</Label>
    {groupLabel ? (
      <label className="flex">
        <span className="p-2 border border-gray-200 bg-gray-200">
          {groupLabel}
        </span>
        <input
          type={type}
          value={value}
          required={required}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(el) => (onChange ? onChange(el.target.value) : undefined)}
          className="w-full p-2 border border-gray-200 bg-gray-50"
        />
      </label>
    ) : (
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(el) => (onChange ? onChange(el.target.value) : undefined)}
        className="w-full p-2 border border-gray-200 bg-gray-50"
      />
    )}
  </>
);
