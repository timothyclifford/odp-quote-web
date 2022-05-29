import { useEffect, useState } from "react";
import { Area } from "../../domain/area/area";
import { AreaItem, buildAreaItem } from "../../domain/area/areaItem";
import { AddButton } from "../fields/AddButton";
import { AreaItemForm } from "./AreaItemForm";
import { Heading3 } from "../Heading3";
import { Row } from "../Row";
import { InputField } from "../fields/InputField";
import { TextAreaField } from "../fields/TextArea";
import { Heading2 } from "../Heading2";
import { Checkbox } from "../fields/Checkbox";
import { Card } from "../Card";
import { HeadingWithAction } from "../HeadingWithAction";
import { ItemPricing } from "../../domain/pricing/pricingService";

type Props = {
  area: Area;
  itemPricing: Array<ItemPricing>;
  onSave: (area: Area) => void;
  onDelete: () => void;
};

export const AreaForm = ({ area, itemPricing, onSave, onDelete }: Props) => {
  const [price, setPrice] = useState(area.price);
  const [includeCeilings, setIncludeCeilings] = useState(area.includeCeilings);
  const [includeSkirting, setIncludeSkirting] = useState(area.includeSkirting);
  const [comment, setComment] = useState(area.comment);
  const [items, setItems] = useState(area.items);
  const addAreaItem = (name: string) => {
    setItems([...items, buildAreaItem(name, itemPricing)]);
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
  useEffect(() => {
    onSave({
      id: area.id,
      name: area.name,
      price,
      includeCeilings,
      includeSkirting,
      items,
      comment,
    });
  }, [price, includeCeilings, includeSkirting, comment, items]);
  return (
    <Card>
      <Row>
        <HeadingWithAction>
          <Heading2>{area.name}</Heading2>
          <button className="btn btn-delete" onClick={onDelete}>
            Remove {area.name.toLowerCase()}
          </button>
        </HeadingWithAction>
      </Row>
      <Row>
        <InputField
          label="Price"
          groupLabel="$"
          value={price}
          type="number"
          onChange={(e) => setPrice(parseInt(e))}
        ></InputField>
      </Row>
      <Row>
        <div className="flex">
          <div className="mr-16">
            <Checkbox
              label="Include ceilings?"
              checked={includeCeilings}
              onChange={(e) => setIncludeCeilings(e.target.checked)}
            ></Checkbox>
          </div>
          <div>
            <Checkbox
              label="Include skirting?"
              checked={includeSkirting}
              onChange={(e) => setIncludeSkirting(e.target.checked)}
            ></Checkbox>
          </div>
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
        <HeadingWithAction>
          <Heading3>{area.name} items</Heading3>
          <AddButton
            label={`Add ${area.name.toLowerCase()} item`}
            options={itemPricing.map((p) => p.name)}
            onClick={(n) => addAreaItem(n)}
          ></AddButton>
        </HeadingWithAction>
      </Row>
      {items.length > 0 && (
        <div className="mb-5">
          <table className="area-items-table">
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
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
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};
