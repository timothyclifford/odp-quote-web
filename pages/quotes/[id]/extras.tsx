import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { AddButton } from "../../../components/fields/AddButton";
import { ExtraForm } from "../../../components/forms/ExtraForm";
import { Heading1 } from "../../../components/Heading1";
import { Layout } from "../../../components/Layout";
import { Row } from "../../../components/Row";
import { buildExtra, Extra } from "../../../domain/extra/extra";
import { QuoteNavigation } from "../../../components/QuoteNavigation";
import { ExtraService } from "../../../domain/extra/extraService";
import { HeadingWithAction } from "../../../components/HeadingWithAction";
import {
  ExtraPricing,
  PricingService,
} from "../../../domain/pricing/pricingService";

type Props = {
  quoteId: string;
  quoteExtras: Array<Extra>;
  extraPricing: Array<ExtraPricing>;
};

const EditExtras: NextPage<Props> = ({
  quoteId,
  quoteExtras,
  extraPricing,
}) => {
  const [extras, setExtras] = useState<Array<Extra>>(quoteExtras);

  const addExtra = (name: string) => {
    setExtras([...extras, buildExtra(name, extraPricing)]);
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
        <title>{`Quote ${quoteId}`}</title>
      </Head>
      <main>
        <QuoteNavigation></QuoteNavigation>
        <Row>
          <HeadingWithAction>
            <Heading1>Quote {quoteId}</Heading1>
            <AddButton
              label="Add extra"
              options={extraPricing.map((p) => p.name)}
              onClick={(n) => addExtra(n)}
            ></AddButton>
          </HeadingWithAction>
        </Row>
        {extras.map((extra, idx) => {
          return (
            <ExtraForm
              key={idx}
              extra={extra}
              pricing={extraPricing}
              onSave={(e) => saveExtra(e, idx)}
              onDelete={() => deleteExtra(extra.id)}
            ></ExtraForm>
          );
        })}
        {extras.length === 0 && <Row>Nothing added yet...</Row>}
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
  const service = ExtraService();
  const quoteExtras = await service.getQuoteExtras(quoteId);
  const pricingService = PricingService();
  const extraPricing = await pricingService.getExtraPricing();
  return {
    props: {
      quoteId,
      quoteExtras,
      extraPricing,
    },
  };
};

export default EditExtras;
