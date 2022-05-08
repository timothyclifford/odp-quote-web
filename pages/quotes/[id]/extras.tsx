import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { AddButton } from "../../../components/fields/AddButton";
import { ExtraForm } from "../../../components/forms/ExtraForm";
import { Footer } from "../../../components/Footer";
import { Heading1 } from "../../../components/Heading1";
import { Heading2 } from "../../../components/Heading2";
import { Layout } from "../../../components/Layout";
import { Navigation } from "../../../components/Navigation";
import { Row } from "../../../components/Row";
import { buildExtra, Extra } from "../../../domain/extra/extra";
import { QuoteNavigation } from "../../../components/QuoteNavigation";
import { EXTRA_NAMES } from "../../../lib/constants";
import { ExtraService } from "../../../domain/extra/extraService";

type Props = {
  quoteId: string;
  data: Array<Extra>;
};

const EditExtras: NextPage<Props> = ({ quoteId, data }) => {
  const [extras, setExtras] = useState<Array<Extra>>(data);

  // Extra
  const addExtra = (name: string) => {
    setExtras([...extras, buildExtra(name)]);
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

  const save = async () => {
    const response = await fetch(`/api/quotes/${quoteId}/extras`, {
      method: "PUT",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(extras),
    });
    if (response.ok) {
      alert("Saved");
    } else {
      alert("An error occurred...");
    }
  };

  return (
    <Layout>
      <Head>
        <title>{`Quote ${quoteId} extras`}</title>
      </Head>
      <main>
        <QuoteNavigation></QuoteNavigation>
        <Heading2 text={`Quote ${quoteId} extras`}></Heading2>
        <Row>
          <AddButton
            label="Add extra"
            options={EXTRA_NAMES}
            onClick={(n) => addExtra(n)}
          ></AddButton>
        </Row>
        {extras.map((extra, idx) => {
          return (
            <ExtraForm
              key={idx}
              extra={extra}
              onSave={(e) => saveExtra(e, idx)}
              onDelete={() => deleteExtra(extra.id)}
            ></ExtraForm>
          );
        })}
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
  const service = ExtraService();
  const extras = await service.getQuoteExtras(quoteId);
  return {
    props: {
      quoteId,
      data: extras,
    },
  };
};

export default EditExtras;
