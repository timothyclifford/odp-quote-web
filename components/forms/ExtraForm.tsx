import { useState } from "react";
import { Extra } from "../../domain/extra/extra";
import { ExtraPricing } from "../../domain/pricing/pricingService";
import { Card } from "../Card";
import { InputField } from "../fields/InputField";
import { QuantityField } from "../fields/QuantityField";
import { TextAreaField } from "../fields/TextArea";
import { Heading2 } from "../Heading2";
import { Row } from "../Row";

type Props = {
  extra: Extra;
  pricing: Array<ExtraPricing>;
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
    <Card>
      <Row>
        <Heading2>{extra.name}</Heading2>
      </Row>
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
          label="Quantity"
          quantity={quantity}
          onSave={(e) => save(() => setQuantity(e))}
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
        <button className="btn btn-delete" onClick={onDelete}>
          Delete {extra.name}
        </button>
      </Row>
    </Card>
  );
};
