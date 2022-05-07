import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { AddButton } from "../../../components/fields/AddButton";
import { AreaForm } from "../../../components/forms/AreaForm";
import { Footer } from "../../../components/Footer";
import { Heading1 } from "../../../components/Heading1";
import { Heading2 } from "../../../components/Heading2";
import { Layout } from "../../../components/Layout";
import { Navigation } from "../../../components/Navigation";
import { Row } from "../../../components/Row";
import { Area, AREA_NAMES, buildArea } from "../../../domain/area/area";
import { QuoteNavigation } from "../../../components/QuoteNavigation";
import { useRouter } from "next/router";
import { AreaService } from "../../../domain/area/areaService";

type Props = {
  quoteId: string;
  data: Array<Area>;
};

const EditAreas: NextPage<Props> = ({ quoteId, data }) => {
  const router = useRouter();
  const [areas, setAreas] = useState<Array<Area>>(data);

  const addArea = (name: string) => {
    setAreas([...areas, buildArea(name)]);
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
      router.push(`/quotes`);
    } else {
      alert("An error occurred...");
    }
  };

  return (
    <Layout>
      <Head>
        <title>Edit quote {quoteId}</title>
      </Head>
      <main>
        <Heading1 text={`Edit quote ${quoteId}`}></Heading1>
        <Navigation quoteId={quoteId}></Navigation>
        <QuoteNavigation></QuoteNavigation>
        <Heading2 text="Areas"></Heading2>
        {areas.map((area, idx) => {
          return (
            <AreaForm
              key={idx}
              area={area}
              onSave={(a) => saveArea(a, idx)}
              onDelete={() => deleteArea(area.id)}
            ></AreaForm>
          );
        })}
        <Row>
          <AddButton
            label="Add area"
            options={AREA_NAMES}
            onClick={(n) => addArea(n)}
          ></AddButton>
        </Row>
        <Row>
          <button className="btn btn-primary" onClick={() => save()}>
            Save
          </button>
        </Row>
      </main>
      <Footer></Footer>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const quoteId = context.params!.id as string;
  const service = AreaService();
  const areas = await service.getQuoteAreas(quoteId);
  return {
    props: {
      quoteId,
      data: areas,
    },
  };
};

export default EditAreas;
