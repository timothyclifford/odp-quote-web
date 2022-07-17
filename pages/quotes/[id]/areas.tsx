import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { AddButton } from "../../../components/fields/AddButton";
import { AreaForm } from "../../../components/forms/AreaForm";
import { Heading1 } from "../../../components/Heading1";
import { Layout } from "../../../components/Layout";
import { Row } from "../../../components/Row";
import { Area, buildArea } from "../../../domain/area/area";
import { QuoteNavigation } from "../../../components/QuoteNavigation";
import { AreaService } from "../../../domain/area/areaService";
import { HeadingWithAction } from "../../../components/HeadingWithAction";
import {
  AreaPricing,
  ItemPricing,
  CMSService,
} from "../../../domain/cms/cmsService";
import toast from "react-hot-toast";

type Props = {
  quoteId: string;
  quoteAreas: Array<Area>;
  areaPricing: Array<AreaPricing>;
  itemPricing: Array<ItemPricing>;
};

const EditAreas: NextPage<Props> = ({
  quoteId,
  quoteAreas,
  areaPricing,
  itemPricing,
}) => {
  const [areas, setAreas] = useState<Array<Area>>(quoteAreas);

  const addArea = (name: string) => {
    setAreas([...areas, buildArea(name, areaPricing)]);
  };
  const saveArea = (area: Area, idx: number) => {
    const updated = [...areas];
    updated[idx] = area;
    setAreas(updated);
  };
  const deleteArea = (id: string) => {
    const updated = areas.filter((a) => a.id !== id);
    setAreas(updated);
  };

  const save = async () => {
    const response = await fetch(`/api/quotes/${quoteId}/areas`, {
      method: "PUT",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(areas),
    });
    if (response.ok) {
      toast.success("Saved");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <Head>
        <title>{`Quote ${quoteId}`}</title>
      </Head>
      <main>
        <QuoteNavigation></QuoteNavigation>
        <Row>
          <HeadingWithAction>
            <Heading1>Quote {quoteId}</Heading1>
            <AddButton
              label="Add area"
              options={areaPricing.map((a) => a.name)}
              onClick={(n) => addArea(n)}
            ></AddButton>
          </HeadingWithAction>
        </Row>
        {areas.map((area, idx) => {
          return (
            <AreaForm
              key={idx}
              area={area}
              itemPricing={itemPricing}
              onSave={(a) => saveArea(a, idx)}
              onDelete={() => deleteArea(area.id)}
            ></AreaForm>
          );
        })}
        {areas.length === 0 && <Row>Nothing added yet...</Row>}
        <Row>
          <button className="btn" onClick={() => save()}>
            Save
          </button>
        </Row>
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const quoteId = context.params!.id as string;
  const areaService = AreaService();
  const quoteAreas = await areaService.getQuoteAreas(quoteId);
  const pricingService = CMSService();
  const areaPricing = await pricingService.getAreaPricing();
  const itemPricing = await pricingService.getItemPricing();
  return {
    props: {
      quoteId,
      quoteAreas,
      areaPricing,
      itemPricing,
    },
  };
};

export default EditAreas;
