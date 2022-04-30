import { useState } from "react";
import { BORDER_STYLE } from "../constants";
import { AreaItem, AREA_ITEM_NAMES } from "../domain/area/areaItem";
import { DropDownField } from "./DropDownField";
import { ExtraField } from "./ExtraField";
import { InputField } from "./InputField";
import { QuantityField } from "./QuantityFields";
import { Row } from "./Row";

type Props = {
  areaItem: AreaItem;
  onSave: (areaItem: AreaItem) => void;
  onDelete: () => void;
};

export const AreaItemField = ({ areaItem, onSave, onDelete }: Props) => {
  const [price, setPrice] = useState(areaItem.price);
  const [quantity, setQuantity] = useState(areaItem.quantity);
  const save = (update: () => void) => {
    update();
    onSave({ id: areaItem.id, name: areaItem.name, price, quantity });
  };
  return (
    <div className={BORDER_STYLE}>
      <Row>{areaItem.name}</Row>
      <Row>
        <InputField
          label="Price"
          groupLabel="$"
          value={price}
          type="number"
          onChange={(e) => save(() => setPrice(parseInt(e)))}
        ></InputField>
      </Row>
      <Row>
        <QuantityField
          quantity={quantity}
          onChange={(e) => save(() => setQuantity(e))}
        ></QuantityField>
      </Row>
      <Row>
        <button className="btn btn-error btn-sm" onClick={onDelete}>
          Delete {areaItem.name}
        </button>
      </Row>
    </div>
  );
};
