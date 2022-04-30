import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Heading1 } from "../../../components/Heading1";
import { Layout } from "../../../components/Layout";
import { Quote, StubQuote } from "../../../domain/quote/quote";
import { QuoteService } from "../../../domain/quote/quoteService";
import { Navigation } from "../../../components/Navigation";
import { QuoteForm } from "../../../components/forms/QuoteForm";
import { Footer } from "../../../components/Footer";

type Props = {
  quote: Quote;
};

const EditQuote: NextPage<Props> = ({ quote }) => {
  const router = useRouter();
  const save = async (quote: Quote) => {
    const response = await fetch(`/api/quotes/`, {
      method: "PUT",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        id: quote.id,
        firstName: quote.firstName,
        lastName: quote.lastName,
        email: quote.email,
        phone: quote.phone,
        street: quote.street,
        suburb: quote.suburb,
        postcode: quote.postcode,
      }),
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
        <title>Edit Quote</title>
      </Head>
      <main>
        <Heading1 text={`Edit quote ${quote.id}`}></Heading1>
        <Navigation quoteId={quote.id}></Navigation>
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
      quote: StubQuote(),
    },
  };
};

export default EditQuote;
