import { useState } from "react";
import { AreaItem, AREA_ITEM_NAMES } from "../domain/area/areaItem";
import { QuantityField } from "./QuantityFields";

type Props = {
  areaItem: AreaItem;
  onSave: (areaItem: AreaItem) => void;
};

export const AreaItemField = ({ areaItem, onSave }: Props) => {
  const [name, setName] = useState(areaItem.name);
  const [price, setPrice] = useState(areaItem.price);
  const [quantity, setQuantity] = useState(areaItem.quantity);
  const save = (update: () => void) => {
    update();
    onSave({ name, price, quantity });
  };
  return (
    <div>
      <select onChange={(e) => save(() => setName(e.target.value))}>
        <option></option>
        {AREA_ITEM_NAMES.map((n) => {
          return <option selected={n === name}>{n}</option>;
        })}
      </select>
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
    </div>
  );
};
