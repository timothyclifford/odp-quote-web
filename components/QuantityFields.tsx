import { Row } from "./Row";

type Props = {
  quantity: number;
  onChange: (quantity: number) => void;
};

export const QuantityField = ({ quantity, onChange }: Props) => (
  <Row>
    <div className="input-group">
      <button
        className="btn btn-square"
        onClick={() => (quantity > 0 ? onChange(quantity - 1) : undefined)}
      >
        -
      </button>
      <input
        type="text"
        className="input input-bordered w-14 text-center"
        value={quantity}
      ></input>
      <button className="btn btn-square" onClick={() => onChange(quantity + 1)}>
        +
      </button>
    </div>
  </Row>
);
