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
    onSave({ id: areaItem.id, name: areaItem.name, price, quantity });
  }, [areaItem.id, areaItem.name, price, quantity]);
  return (
    <tr>
      <td style={{ textAlign: "left" }}>{areaItem.name}</td>
      <td className="w-32">
        <InputField
          value={price}
          groupLabel="$"
          type="number"
          onChange={(e) => setPrice(parseInt(e))}
        ></InputField>
      </td>
      <td>
        <div className="flex justify-center">
          <QuantityField
            quantity={quantity}
            onSave={(e) => setQuantity(e)}
          ></QuantityField>
        </div>
      </td>
      <td>
        <button className="btn btn-delete" onClick={() => onDelete()}>
          Remove
        </button>
      </td>
    </tr>
  );
};
