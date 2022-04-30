import { useState } from "react";
import { BORDER_STYLE } from "../../constants";
import { Extra } from "../../domain/extra/extra";
import { InputField } from "../InputField";
import { QuantityField } from "../QuantityFields";
import { Row } from "../Row";
import { TextAreaField } from "../TextArea";

type Props = {
  extra: Extra;
  onSave: (extra: Extra) => void;
  onDelete: () => void;
};

export const ExtraForm = ({ extra, onSave, onDelete }: Props) => {
  const [price, setPrice] = useState(extra.price);
  const [quantity, setQuantity] = useState(extra.quantity);
  const [comment, setComment] = useState(extra.comment);
  const save = (update: () => void) => {
    update();
    onSave({ id: extra.id, name: extra.name, price, quantity, comment });
  };
  return (
    <div className={BORDER_STYLE}>
      <Row>{extra.name}</Row>
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
        <TextAreaField
          label="Comments"
          value={comment}
          onChange={(e) => save(() => setComment(e))}
        ></TextAreaField>
      </Row>
      <Row>
        <button className="btn btn-error btn-sm" onClick={onDelete}>
          Delete {extra.name}
        </button>
      </Row>
    </div>
  );
};
