import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Layout } from "../../../components/Layout";
import { QuoteMutation, Quote } from "../../../domain/quote/quote";
import { QuoteService } from "../../../domain/quote/quoteService";
import { QuoteForm } from "../../../components/forms/QuoteForm";
import { Footer } from "../../../components/Footer";
import { QuoteNavigation } from "../../../components/QuoteNavigation";
import { Heading2 } from "../../../components/Heading2";

type Props = {
  data: Quote;
};

const EditQuote: NextPage<Props> = ({ data }) => {
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
        <title>{`Quote ${data.id} customer details`}</title>
      </Head>
      <main>
        <QuoteNavigation></QuoteNavigation>
        <Heading2 text={`Quote ${data.id} customer details`}></Heading2>
        <QuoteForm quote={data} onSubmit={save}></QuoteForm>
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const quoteId = context.params!.id as string;
  const service = QuoteService();
  const quote = await service.getById(quoteId);
  return {
    props: {
      data: quote,
    },
  };
};

export default EditQuote;
