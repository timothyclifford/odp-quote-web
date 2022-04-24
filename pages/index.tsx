import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
    <div>
      <Head>
        <title>Quote</title>
      </Head>
      <main>
        <h1>Quotes</h1>
        <div>
          <button onClick={() => router.push("/quotes")}>New quote</button>
        </div>
        {quotes.map((q) => {
          return <div>{q.id}</div>;
        })}
      </main>
      <footer></footer>
    </div>
  );
};

export default Dashboard;
