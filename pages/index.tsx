import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Footer } from "../components/Footer";
import { Heading1 } from "../components/Heading1";
import { Layout } from "../components/Layout";
import { Row } from "../components/Row";
import { Quote } from "../domain/quote/quote";
import { QuoteRepository } from "../domain/quote/quoteRepository";

type Props = {
  quotes: Array<Quote>;
};

const Dashboard: NextPage<Props> = ({ quotes }) => {
  const router = useRouter();
  const deleteQuote = async (id: string) => {
    const really = confirm("Are you sure?");
    if (!really) return;
    const response = await fetch(`/api/quotes/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
    if (response.ok) {
      router.push(`/`);
    } else {
      alert("An error occurred...");
    }
  };
  return (
    <Layout>
      <Head>
        <title>Quote</title>
      </Head>
      <main>
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
                  <td>{q.created}</td>
                  <td>{q.email}</td>
                  <td>{q.lastName}</td>
                  <td>{q.suburb}</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => router.push(`/quotes/${q.id}`)}
                      title="View quote"
                    >
                      <img src="/view.png" width={24} />
                    </button>
                    <button
                      className="btn btn-error ml-2"
                      onClick={() => deleteQuote(q.id)}
                      title="Delete quote"
                    >
                      <img src="/trash.png" width={24} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const repository = QuoteRepository();
  const quotes = await repository.getAllQuotes();
  return {
    props: {
      quotes: quotes,
    },
  };
};

export default Dashboard;
