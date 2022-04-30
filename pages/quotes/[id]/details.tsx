import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { AreaField } from "../../../components/AreaField";
import { ExtraField } from "../../../components/ExtraField";
import { Heading1 } from "../../../components/Heading1";
import { Heading2 } from "../../../components/Heading2";
import { Layout } from "../../../components/Layout";
import { Navigation } from "../../../components/Navigation";
import { Row } from "../../../components/Row";
import { Area, createArea } from "../../../domain/area/area";
import { createExtra, Extra } from "../../../domain/extra/extra";
import { Quote } from "../../../domain/quote/quote";
import { QuoteService } from "../../../domain/quote/quoteService";

type Props = {
  quote: Quote;
};

const QuoteDetails: NextPage<Props> = ({ quote }) => {
  const [areas, setAreas] = useState<Array<Area>>([]);
  const [extras, setExtras] = useState<Array<Extra>>([]);

  const save = () => {
    // TODO
  };

  // Area
  const addArea = () => {
    setAreas([...areas, createArea()]);
  };
  const saveArea = (area: Area, idx: number) => {
    const updated = [...areas];
    updated[idx] = area;
    setAreas(updated);
  };
  const deleteArea = (area: Area) => {
    const updated = areas.filter((a) => a !== area);
    setAreas(updated);
  };

  // Extra
  const addExtra = () => {
    setExtras([...extras, createExtra()]);
  };
  const saveExtra = (extra: Extra, idx: number) => {
    const updated = [...extras];
    updated[idx] = extra;
    setExtras(updated);
  };
  const deleteExtra = (extra: Extra) => {
    const updated = extras.filter((e) => e !== extra);
    setExtras(updated);
  };

  return (
    <Layout>
      <Head>
        <title>{`Quote ${quote.id}`}</title>
      </Head>
      <main>
        <Heading1 text={`Quote ${quote.id}`}></Heading1>
        <Navigation quoteId={quote.id}></Navigation>
        <Heading2 text="Areas"></Heading2>
        {areas.map((area, idx) => {
          return (
            <>
              <Row>
                <AreaField
                  area={area}
                  onSave={(a) => saveArea(a, idx)}
                ></AreaField>
              </Row>
              <Row>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => deleteArea(area)}
                >
                  Delete area
                </button>
              </Row>
            </>
          );
        })}
        <Row>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => addArea()}
          >
            Add area
          </button>
        </Row>
        <Heading2 text="Extras"></Heading2>
        {extras.map((extra, idx) => {
          return (
            <>
              <Row>
                <ExtraField
                  extra={extra}
                  onSave={(e) => saveExtra(e, idx)}
                ></ExtraField>
              </Row>
              <Row>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => deleteExtra(extra)}
                >
                  Delete extra
                </button>
              </Row>
            </>
          );
        })}
        <Row>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => addExtra()}
          >
            Add extra
          </button>
        </Row>
        <Row>
          <button className="btn btn-primary" onClick={() => save()}>
            Save
          </button>
        </Row>
      </main>
      <footer></footer>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params!.id as string;
  const service = QuoteService();
  const quote = service.getById(id);
  return {
    props: {
      quote: {
        id: "1234",
        firstName: "Bob",
        lastName: "Bobson",
        email: "bob@bobson.com",
        phone: "0400000000",
        street: "123 Bob St",
        suburb: "Bobville",
        postcode: "3210",
      },
    },
  };
};

export default QuoteDetails;
