import { useState } from "react";
import { Area, AREA_NAMES } from "../domain/area/area";
import { AreaItem, createAreaItem } from "../domain/area/areaItem";
import { AreaItemField } from "./AreaItemField";
import { InputField } from "./InputField";
import { Row } from "./Row";
import { TextAreaField } from "./TextArea";

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
    <>
      <Row>
        <select className="select select-bordered">
          <option></option>
          {AREA_NAMES.map((a) => {
            return <option>{a}</option>;
          })}
        </select>
      </Row>
      <Row>
        <InputField
          label="Price"
          groupLabel="$"
          value={price}
          type="number"
          onChange={(x) => save(() => setPrice(parseInt(x)))}
        ></InputField>
      </Row>
      <Row>
        <div className="form-control w-36">
          <label className="label cursor-pointer">
            <span className="label-text">Ceilings</span>
            <input
              type="checkbox"
              className="toggle"
              checked={includeCeilings}
              onChange={(e) => setIncludeCeilings(e.target.checked)}
            ></input>
          </label>
        </div>
      </Row>
      <Row>
        <div className="form-control w-36">
          <label className="label cursor-pointer">
            <span className="label-text">Skirting</span>
            <input
              type="checkbox"
              className="toggle"
              checked={includeSkirting}
              onChange={(e) => setIncludeSkirting(e.target.checked)}
            ></input>
          </label>
        </div>
      </Row>
      {items.map((areaItem, idx) => {
        return (
          <>
            <Row>
              <AreaItemField
                areaItem={areaItem}
                onSave={(ai) => saveAreaItem(ai, idx)}
              ></AreaItemField>
            </Row>
            <Row>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => deleteAreaItem(areaItem)}
              >
                Delete item
              </button>
            </Row>
          </>
        );
      })}
      <Row>
        <button className="btn btn-secondary btn-sm" onClick={() => addItem()}>
          Add item
        </button>
      </Row>
      <Row>
        <TextAreaField
          label="Comments"
          value={comment}
          onChange={(x) => save(() => setComment(x))}
        ></TextAreaField>
      </Row>
    </>
  );
};
