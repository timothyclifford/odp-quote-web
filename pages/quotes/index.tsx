import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Footer } from "../../components/Footer";
import { Heading1 } from "../../components/Heading1";
import { Layout } from "../../components/Layout";
import { Navigation } from "../../components/Navigation";
import { QuoteForm } from "../../components/forms/QuoteForm";
import { buildQuote, Quote } from "../../domain/quote/quote";

const CreateQuote: NextPage = () => {
  const router = useRouter();
  const save = async (quote: Quote) => {
    const response = await fetch(`/api/quotes/`, {
      method: "POST",
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
      router.push(`/quotes/${quote.id}`);
    } else {
      alert("An error occurred...");
    }
  };
  return (
    <Layout>
      <Head>
        <title>New Quote</title>
      </Head>
      <main>
        <Heading1 text="New quote"></Heading1>
        <Navigation></Navigation>
        <QuoteForm quote={buildQuote()} onSubmit={save}></QuoteForm>
      </main>
      <Footer></Footer>
    </Layout>
  );
};

export default CreateQuote;
