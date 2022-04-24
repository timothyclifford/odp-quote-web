type Props = {
  quantity: number;
  onChange: (quantity: number) => void;
};

export const QuantityField = ({ quantity, onChange }: Props) => {
  return (
    <div>
      <span>
        <button
          onClick={() => (quantity > 0 ? onChange(quantity - 1) : undefined)}
        >
          -
        </button>
      </span>
      <span>{quantity}</span>
      <span>
        <button onClick={() => onChange(quantity + 1)}>+</button>
      </span>
    </div>
  );
};
