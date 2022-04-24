import { useState } from "react";
import { AreaItem, AREA_ITEM_NAMES } from "../domain/area/areaItem";
import { InputField } from "./InputField";
import { QuantityField } from "./QuantityFields";
import { Row } from "./Row";

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
    <>
      <Row>
        <select
          className="select select-bordered"
          onChange={(e) => save(() => setName(e.target.value))}
        >
          <option></option>
          {AREA_ITEM_NAMES.map((n) => {
            return <option selected={n === name}>{n}</option>;
          })}
        </select>
      </Row>
      <Row>
        $
        <input
          type="number"
          value={price}
          onChange={(e) => save(() => setPrice(parseInt(e.target.value)))}
        />
      </Row>
      <QuantityField
        quantity={quantity}
        onChange={(q) => save(() => setQuantity(q))}
      ></QuantityField>
    </>
  );
};
