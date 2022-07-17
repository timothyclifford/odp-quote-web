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
import toast from "react-hot-toast";

type Props = {
  quote: Quote;
};

const EditQuote: NextPage<Props> = ({ quote }) => {
  const save = async (quote: QuoteMutation) => {
    try {
      const quoteService = QuoteService();
      await quoteService.updateQuote(quote);
      toast.success("Saved");
    } catch (error) {
      toast.error("Something went wrong");
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
  const quoteService = QuoteService();
  const quote = await quoteService.getById(quoteId);
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
