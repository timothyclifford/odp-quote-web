import { useState } from "react";
import { Area, AREA_NAMES } from "../domain/area/area";
import { AreaItem, createAreaItem } from "../domain/area/areaItem";
import { AreaItemField } from "./AreaItemField";

type Props = {
  area: Area;
  onSave: (area: Area) => void;
};

export const AreaField = ({ area, onSave }: Props) => {
  const [name, setName] = useState(area.name);
  const [price, setPrice] = useState(area.price);
  const [includeCeilings, setIncludeCeilings] = useState(area.includeCeilings);
  const [includeSkirting, setIncludeSkirting] = useState(area.includeSkirting);
  const [items, setItems] = useState(area.items);
  const [comment, setComment] = useState(area.comment);
  const addItem = () => {
    setItems([...items, createAreaItem()]);
  };
  const saveAreaItem = (areaItem: AreaItem, idx: number) => {
    const updated = [...items];
    updated[idx] = areaItem;
    setItems(updated);
  };
  const deleteAreaItem = (areaItem: AreaItem) => {
    const updated = items.filter((i) => i !== areaItem);
    setItems(updated);
  };
  const save = (update: () => void) => {
    update();
    onSave({ name, price, includeCeilings, includeSkirting, items, comment });
  };
  return (
    <div>
      <div>
        <select>
          <option></option>
          {AREA_NAMES.map((a) => {
            return <option>{a}</option>;
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
      <div>
        <span>Ceilings</span>
        <span>
          <input
            type="checkbox"
            checked={includeCeilings}
            onChange={(e) => setIncludeCeilings(e.target.checked)}
          />
        </span>
      </div>
      <div>
        <span>Skirting</span>
        <span>
          <input
            type="checkbox"
            checked={includeSkirting}
            onChange={(e) => setIncludeSkirting(e.target.checked)}
          />
        </span>
      </div>
      <div>
        {items.map((areaItem, idx) => {
          return (
            <div>
              <AreaItemField
                areaItem={areaItem}
                onSave={(ai) => saveAreaItem(ai, idx)}
              ></AreaItemField>
              <div>
                <button onClick={() => deleteAreaItem(areaItem)}>
                  Delete item
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={() => addItem()}>Add item</button>
      </div>
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
