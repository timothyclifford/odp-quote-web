import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Layout } from "../../../components/Layout";
import { DetailedQuote } from "../../../domain/quote/quote";
import { QuoteService } from "../../../domain/quote/quoteService";
import { QuoteNavigation } from "../../../components/QuoteNavigation";
import { Heading1 } from "../../../components/Heading1";
import { Row } from "../../../components/Row";
import { HeadingWithAction } from "../../../components/HeadingWithAction";
import { Card } from "../../../components/Card";
import { Heading2 } from "../../../components/Heading2";
import { Heading3 } from "../../../components/Heading3";
import toast from "react-hot-toast";

type Props = {
  quote: DetailedQuote;
};

const EmailQuote: NextPage<Props> = ({ quote }) => {
  const emailQuote = async () => {
    const really = confirm("Are you sure you want to email?");
    if (really) {
      const response = await fetch(`/api/quotes/${quote.id}/email`, {
        method: "POST",
      });
      if (response.ok) {
        toast.success("Saved");
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <Layout>
      <Head>
        <title>{`Quote ${quote.id}`}</title>
      </Head>
      <main>
        <QuoteNavigation></QuoteNavigation>
        <Row>
          <HeadingWithAction>
            <Heading1>Quote {quote.id}</Heading1>
            {/* <div>
              <button className="btn">Email quote</button>
            </div> */}
          </HeadingWithAction>
        </Row>

        <Card>
          <Row>
            <p>Dear {quote.firstName}</p>
            <p>
              One Day Paint are pleased to offer your the following quote for
              painting.
            </p>
          </Row>
          <Row>
            <Heading2>Areas</Heading2>
          </Row>
          {quote.areas &&
            quote.areas.map((area) => (
              <div
                key={area.id}
                className="border border-gray-200 p-5 mb-5 rounded"
              >
                <Row>
                  <Heading3>{area.name}</Heading3>
                </Row>
                <Row>Items</Row>
                {area.items.map((item) => (
                  <div key={item.id}>
                    {item.quantity} x {item.name}
                  </div>
                ))}
              </div>
            ))}
          {!quote.areas && <Row>No areas selected</Row>}
          <Row>
            <Heading2>Extras</Heading2>
          </Row>
          {quote.extras &&
            quote.extras.map((extra) => (
              <div
                key={extra.id}
                className="border border-gray-200 p-5 mb-5 rounded"
              >
                <Row>
                  {extra.quantity} x {extra.name}
                </Row>
              </div>
            ))}
          {!quote.extras && <Row>No extras selected</Row>}
          <Row>
            <div className="grid grid-cols-2">
              <div>
                <div className="mb-2">
                  <Heading2>Inclusions</Heading2>
                </div>
                {quote.inclusions.inclusions
                  .filter((x) => x.included)
                  .map((x) => {
                    return (
                      <div key={x.name} className="mb-2">
                        ✅ {x.name}
                      </div>
                    );
                  })}
              </div>
              <div>
                <div className="mb-2">
                  <Heading2>Exclusions</Heading2>
                </div>
                {quote.inclusions.exclusions
                  .filter((x) => x.included)
                  .map((x) => {
                    return (
                      <div key={x.name} className="mb-2">
                        ❌ {x.name}
                      </div>
                    );
                  })}
              </div>
            </div>
          </Row>
          <Row>
            <Heading2>Comments</Heading2>
          </Row>
          <Row>{quote.inclusions.comments}</Row>
        </Card>
        <Row>
          <button className="btn" onClick={() => emailQuote()}>
            Email quote to customer
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
  const service = QuoteService();
  const quote = await service.getDetailedQuote(quoteId);
  if (quote === undefined) {
    throw Error(`Unable to find quote ${quoteId}`);
  }
  return {
    props: {
      quote,
    },
  };
};

export default EmailQuote;
