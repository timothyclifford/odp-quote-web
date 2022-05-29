import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Layout } from "../../../components/Layout";
import { QuoteMutation, Quote } from "../../../domain/quote/quote";
import { QuoteService } from "../../../domain/quote/quoteService";
import { QuoteForm } from "../../../components/forms/QuoteForm";
import { QuoteNavigation } from "../../../components/QuoteNavigation";
import { Heading1 } from "../../../components/Heading1";
import { Row } from "../../../components/Row";
import { HeadingWithAction } from "../../../components/HeadingWithAction";

type Props = {
  quote: Quote;
};

const EditQuote: NextPage<Props> = ({ quote }) => {
  const service = QuoteService();
  const save = async (quote: QuoteMutation) => {
    try {
      await service.updateQuote(quote);
      alert("Saved");
    } catch (error) {
      console.log(error);
      // TODO handle error
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
          </HeadingWithAction>
        </Row>
        <QuoteForm quote={quote} onSubmit={save}></QuoteForm>
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const quoteId = context.params!.id as string;
  const service = QuoteService();
  const quote = await service.getById(quoteId);
  if (quote === undefined) {
    throw Error(`Unable to find quote ${quoteId}`);
  }
  return {
    props: {
      quote,
    },
  };
};

export default EditQuote;
