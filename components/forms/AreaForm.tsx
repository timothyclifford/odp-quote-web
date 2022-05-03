import { useState } from "react";
import { BORDER_STYLE } from "../../constants";
import { Area } from "../../domain/area/area";
import {
  AreaItem,
  AREA_ITEM_NAMES,
  buildAreaItem,
} from "../../domain/area/areaItem";
import { AddButton } from "../fields/AddButton";
import { AreaItemForm } from "./AreaItemForm";
import { Heading3 } from "../Heading3";
import { Row } from "../Row";
import { InputField } from "../fields/InputField";
import { TextAreaField } from "../fields/TextArea";

type Props = {
  area: Area;
  onSave: (area: Area) => void;
  onDelete: () => void;
};

export const AreaForm = ({ area, onSave, onDelete }: Props) => {
  const [price, setPrice] = useState(area.price);
  const [includeCeilings, setIncludeCeilings] = useState(area.includeCeilings);
  const [includeSkirting, setIncludeSkirting] = useState(area.includeSkirting);
  const [items, setItems] = useState(area.items);
  const [comment, setComment] = useState(area.comment);
  const addAreaItem = (name: string) => {
    setItems([...items, buildAreaItem(name)]);
  };
  const saveAreaItem = (areaItem: AreaItem, idx: number) => {
    const updated = [...items];
    updated[idx] = areaItem;
    setItems(updated);
  };
  const deleteAreaItem = (id: string) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
  };
  const save = (update: () => void) => {
    update();
    onSave({
      id: area.id,
      name: area.name,
      price,
      includeCeilings,
      includeSkirting,
      items,
      comment,
    });
  };
  return (
    <div className={BORDER_STYLE}>
      <Row>{area.name}</Row>
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
      <Row>
        <TextAreaField
          label="Comments"
          value={comment}
          onChange={(e) => setComment(e)}
        ></TextAreaField>
      </Row>
      <Row>
        <Heading3 text="Items"></Heading3>
      </Row>
      {items.map((areaItem, idx) => {
        return (
          <AreaItemForm
            key={idx}
            areaItem={areaItem}
            onSave={(ai) => saveAreaItem(ai, idx)}
            onDelete={() => deleteAreaItem(areaItem.id)}
          ></AreaItemForm>
        );
      })}
      <Row>
        <AddButton
          label="Add item"
          options={AREA_ITEM_NAMES}
          onClick={(n) => addAreaItem(n)}
        ></AddButton>
      </Row>
      <Row>
        <button className="btn btn-error btn-sm" onClick={onDelete}>
          Delete {area.name}
        </button>
      </Row>
    </div>
  );
};
