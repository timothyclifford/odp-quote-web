import { useCallback, useEffect, useState } from "react";
import { BORDER_STYLE } from "../../constants";
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
    <div className={BORDER_STYLE}>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <tbody>
            <tr>
              <td>{areaItem.name}</td>
              <td>
                <InputField
                  label="Price"
                  groupLabel="$"
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
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => onDelete()}
                >
                  X
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
