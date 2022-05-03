import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Heading1 } from "../../../components/Heading1";
import { Layout } from "../../../components/Layout";
import { Quote, stubQuote } from "../../../domain/quote/quote";
import { QuoteService } from "../../../domain/quote/quoteService";
import { Navigation } from "../../../components/Navigation";
import { QuoteForm } from "../../../components/forms/QuoteForm";
import { Footer } from "../../../components/Footer";
import { QuoteNavigation } from "../../../components/QuoteNavigation";

type Props = {
  quote: Quote;
};

const EditQuote: NextPage<Props> = ({ quote }) => {
  const router = useRouter();
  const service = QuoteService();
  const save = async (quote: Quote) => {
    try {
      await service.createQuote(quote);
      router.push(`/quotes`);
    } catch (error) {
      console.log(error);
      // TODO handle error
    }
  };
  return (
    <Layout>
      <Head>
        <title>Edit Quote</title>
      </Head>
      <main>
        <Heading1 text={`Edit quote ${quote.id}`}></Heading1>
        <Navigation quoteId={quote.id}></Navigation>
        <QuoteNavigation></QuoteNavigation>
        <QuoteForm quote={quote} onSubmit={save}></QuoteForm>
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
      quote: stubQuote(),
    },
  };
};

export default EditQuote;
