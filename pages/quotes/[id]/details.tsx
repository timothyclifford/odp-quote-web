import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { AddButton } from "../../../components/AddButton";
import { AreaForm } from "../../../components/forms/AreaForm";
import { ExtraForm } from "../../../components/forms/ExtraForm";
import { Footer } from "../../../components/Footer";
import { Heading1 } from "../../../components/Heading1";
import { Heading2 } from "../../../components/Heading2";
import { Layout } from "../../../components/Layout";
import { Navigation } from "../../../components/Navigation";
import { Row } from "../../../components/Row";
import { Area, AREA_NAMES, BuildArea } from "../../../domain/area/area";
import { BuildExtra, Extra, EXTRA_NAMES } from "../../../domain/extra/extra";
import { Quote, StubQuote } from "../../../domain/quote/quote";
import { QuoteService } from "../../../domain/quote/quoteService";

type Props = {
  quote: Quote;
};

const QuoteForm: NextPage<Props> = ({ quote }) => {
  const [areas, setAreas] = useState<Array<Area>>([]);
  const [extras, setExtras] = useState<Array<Extra>>([]);
  const [activeTab, setActiveTab] = useState<"AREAS" | "EXTRAS">("AREAS");

  const save = () => {
    // TODO
  };

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

  // Extra
  const addExtra = (name: string) => {
    setExtras([...extras, BuildExtra(name)]);
  };
  const saveExtra = (extra: Extra, idx: number) => {
    const updated = [...extras];
    updated[idx] = extra;
    setExtras(updated);
  };
  const deleteExtra = (id: string) => {
    const updated = extras.filter((e) => e.id !== id);
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
        <div className="tabs">
          <a
            className={`tab ${activeTab === "AREAS" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("AREAS")}
          >
            Areas
          </a>
          <a
            className={`tab ${activeTab === "EXTRAS" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("EXTRAS")}
          >
            Extras
          </a>
        </div>
        {activeTab === "AREAS" && (
          <div>
            <Heading2 text="Areas"></Heading2>
            {areas.map((area, idx) => {
              return (
                <AreaForm
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
          </div>
        )}
        {activeTab === "EXTRAS" && (
          <div>
            <Heading2 text="Extras"></Heading2>
            {extras.map((extra, idx) => {
              return (
                <ExtraForm
                  extra={extra}
                  onSave={(e) => saveExtra(e, idx)}
                  onDelete={() => deleteExtra(extra.id)}
                ></ExtraForm>
              );
            })}
            <Row>
              <AddButton
                label="Add extra"
                options={EXTRA_NAMES}
                onClick={(n) => addExtra(n)}
              ></AddButton>
            </Row>
          </div>
        )}
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

export default QuoteForm;
