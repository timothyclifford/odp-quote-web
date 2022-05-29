import { Label } from "./Label";

export const TextAreaField = ({
  label,
  value,
  placeholder,
  onChange,
}: {
  label?: string;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}) => (
  <div>
    <Label>{label}</Label>
    <textarea
      className="w-full h-24 p-4 border border-gray-200 bg-gray-50"
      value={value}
      placeholder={placeholder}
      onChange={onChange ? (el) => onChange(el.target.value) : undefined}
    ></textarea>
  </div>
);
