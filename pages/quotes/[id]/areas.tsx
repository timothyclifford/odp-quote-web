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
import { Area, AREA_NAMES, BuildArea } from "../../../domain/area/area";
import { Quote, StubQuote } from "../../../domain/quote/quote";
import { QuoteService } from "../../../domain/quote/quoteService";
import { QuoteNavigation } from "../../../components/QuoteNavigation";
import { useRouter } from "next/router";

type Props = {
  quote: Quote;
};

const EditAreas: NextPage<Props> = ({ quote }) => {
  const router = useRouter();
  const [areas, setAreas] = useState<Array<Area>>(quote.areas ?? []);

  // Area
  const addArea = (name: string) => {
    setAreas([...areas, BuildArea(name)]);
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
    const response = await fetch(`/api/quotes/${quote.id}/areas`, {
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
        <title>{`Quote ${quote.id}`}</title>
      </Head>
      <main>
        <Heading1 text={`Quote ${quote.id}`}></Heading1>
        <Navigation quoteId={quote.id}></Navigation>
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
  const id = context.params!.id as string;
  const service = QuoteService();
  const quote = service.getById(id);
  return {
    props: {
      quote: StubQuote(),
    },
  };
};

export default EditAreas;
