import { useEffect, useState } from "react";
import { AreaItem } from "../../domain/area/areaItem";
import { InputField } from "../fields/InputField";
import { QuantityField } from "../fields/QuantityField";

type Props = {
  areaItem: AreaItem;
  onSave: (areaItem: AreaItem) => void;
  onDelete: () => void;
};

export const AreaItemForm = ({ areaItem, onSave, onDelete }: Props) => {
  const [price, setPrice] = useState(areaItem.price);
  const [quantity, setQuantity] = useState(areaItem.quantity);
  useEffect(() => {
    console.log("saving area item...");
    onSave({ id: areaItem.id, name: areaItem.name, price, quantity });
  }, [price, quantity]);
  return (
    <tr>
      <td>{areaItem.name}</td>
      <td>
        <InputField
          value={price}
          type="number"
          onChange={(e) => setPrice(parseInt(e))}
        ></InputField>
      </td>
      <td>
        <QuantityField
          quantity={quantity}
          onSave={(e) => setQuantity(e)}
        ></QuantityField>
      </td>
      <td>
        <button className="btn btn-error" onClick={() => onDelete()}>
          <img src="/trash.png" width={24} />
        </button>
      </td>
    </tr>
  );
};
