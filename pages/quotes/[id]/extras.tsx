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
import { BuildExtra, Extra, EXTRA_NAMES } from "../../../domain/extra/extra";
import { Quote, StubQuote } from "../../../domain/quote/quote";
import { QuoteService } from "../../../domain/quote/quoteService";
import { QuoteNavigation } from "../../../components/QuoteNavigation";
import { useRouter } from "next/router";

type Props = {
  quote: Quote;
};

const EditExtras: NextPage<Props> = ({ quote }) => {
  const router = useRouter();
  const [extras, setExtras] = useState<Array<Extra>>(quote.extras ?? []);

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

  const save = async () => {
    const response = await fetch(`/api/quotes/${quote.id}/extras`, {
      method: "PUT",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(extras),
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
        <Heading2 text="Extras"></Heading2>
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
          <AddButton
            label="Add extra"
            options={EXTRA_NAMES}
            onClick={(n) => addExtra(n)}
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

export default EditExtras;
