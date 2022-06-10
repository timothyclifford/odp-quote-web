import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Heading1 } from "../../components/Heading1";
import { Layout } from "../../components/Layout";
import { QuoteForm } from "../../components/forms/QuoteForm";
import { buildQuote, QuoteMutation } from "../../domain/quote/quote";
import { Row } from "../../components/Row";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const CreateQuote: NextPage = () => {
  const router = useRouter();
  const session = useSession();
  const quote = buildQuote(session.data?.user?.name ?? "One Day Paint");
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
        <QuoteForm quote={quote} onSubmit={save}></QuoteForm>
      </main>
    </Layout>
  );
};

export default CreateQuote;
