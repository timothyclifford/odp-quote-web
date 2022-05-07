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
  data: Quote;
};

const EditQuote: NextPage<Props> = ({ data }) => {
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
        <title>Edit quote ${data.id}</title>
      </Head>
      <main>
        <Heading1 text={`Edit quote ${data.id}`}></Heading1>
        <Navigation quoteId={data.id}></Navigation>
        <QuoteNavigation></QuoteNavigation>
        <QuoteForm quote={data} onSubmit={save}></QuoteForm>
      </main>
      <Footer></Footer>
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
