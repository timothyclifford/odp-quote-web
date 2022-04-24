import { useState } from "react";
import { Extra, EXTRA_NAMES } from "../domain/extra/extra";
import { QuantityField } from "./QuantityFields";

type Props = {
  extra: Extra;
  onSave: (extra: Extra) => void;
};

export const ExtraField = ({ extra, onSave }: Props) => {
  const [name, setName] = useState(extra.name);
  const [price, setPrice] = useState(extra.price);
  const [quantity, setQuantity] = useState(extra.quantity);
  const [comment, setComment] = useState(extra.comment);
  const save = (update: () => void) => {
    update();
    onSave({ name, price, quantity, comment });
  };
  return (
    <div>
      <div>
        <select onChange={(e) => save(() => setName(e.target.value))}>
          <option></option>
          {EXTRA_NAMES.map((n) => {
            return <option selected={n === name}>{n}</option>;
          })}
        </select>
      </div>
      <div>
        $
        <input
          type="number"
          value={price}
          onChange={(e) => save(() => setPrice(parseInt(e.target.value)))}
        />
      </div>
      <QuantityField
        quantity={quantity}
        onChange={(q) => save(() => setQuantity(q))}
      ></QuantityField>
      <div>
        <input
          type="text"
          value={comment}
          placeholder="Comments..."
          onChange={(e) => save(() => setComment(e.target.value))}
        />
      </div>
    </div>
  );
};
