export const TextAreaField = ({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}) => (
  <div className="form-control">
    <label className="label">
      <span className="label-text">{label}</span>
    </label>
    <textarea
      className="textarea textarea-bordered h-24"
      value={value}
      placeholder={placeholder}
      onChange={onChange ? (el) => onChange(el.target.value) : undefined}
    ></textarea>
  </div>
);
