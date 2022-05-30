import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Footer } from "../../components/Footer";
import { Heading1 } from "../../components/Heading1";
import { Layout } from "../../components/Layout";
import { Navigation } from "../../components/Navigation";
import { QuoteForm } from "../../components/forms/QuoteForm";
import { buildQuote, QuoteMutation, Quote } from "../../domain/quote/quote";
import { Row } from "../../components/Row";
import toast from "react-hot-toast";

const CreateQuote: NextPage = () => {
  const router = useRouter();
  const save = async (quote: QuoteMutation) => {
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
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <Head>
        <title>New Quote</title>
      </Head>
      <main>
        <Row>
          <Heading1>New quote</Heading1>
        </Row>
        <QuoteForm quote={buildQuote()} onSubmit={save}></QuoteForm>
      </main>
    </Layout>
  );
};

export default CreateQuote;
