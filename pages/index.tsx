import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Heading1 } from "../components/Heading1";
import { Layout } from "../components/Layout";
import { Row } from "../components/Row";
import { Quote } from "../domain/quote/quote";
import { QuoteService } from "../domain/quote/quoteService";

type Props = {
  quotes: Array<Quote>;
};
const Dashboard: NextPage<Props> = ({ quotes }) => {
  const router = useRouter();
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
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Email</th>
              <th>Last name</th>
              <th>Suburb</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((q) => {
              return (
                <tr key={q.id}>
                  <td>{q.id}</td>
                  <td>TODO</td>
                  <td>{q.email}</td>
                  <td>{q.lastName}</td>
                  <td>{q.suburb}</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => router.push(`/quotes/${q.id}`)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
      <Footer></Footer>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const service = QuoteService();
  const quotes = await service.getAll();
  return {
    props: {
      quotes: quotes,
    },
  };
};

export default Dashboard;
