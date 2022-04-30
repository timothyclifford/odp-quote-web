import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Heading1 } from "../components/Heading1";
import { Layout } from "../components/Layout";
import { Row } from "../components/Row";
import { Quote } from "../domain/quote/quote";

const Dashboard: NextPage = () => {
  const router = useRouter();
  const [quotes, setQuotes] = useState<Array<Quote>>([]);
  useEffect(() => {
    fetch(`/api/quotes/`, {
      method: "GET",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setQuotes(data);
      });
  }, []);
  return (
    <Layout>
      <Head>
        <title>Quote</title>
      </Head>
      <main>
        <Heading1 text="Quotes"></Heading1>
        <Row>
          <button
            className="btn btn-primary"
            onClick={() => router.push("/quotes")}
          >
            Start new quote
          </button>
        </Row>
        {quotes.map((q) => {
          return <div>{q.id}</div>;
        })}
      </main>
      <Footer></Footer>
    </Layout>
  );
};

export default Dashboard;
