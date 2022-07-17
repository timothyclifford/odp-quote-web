import { compareDesc, parse } from "date-fns";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";
import { Quote } from "../domain/quote/quote";
import { QuoteRepository } from "../domain/quote/quoteRepository";

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
        <table className="w-full quotes-table">
          <thead>
            <tr>
              <th>Number</th>
              <th>Created</th>
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
                      className="btn"
                      onClick={() => router.push(`/quotes/${q.id}`)}
                      title="View"
                    >
                      View
                    </button>
                    {/* <button
                      className="btn btn-delete ml-3"
                      onClick={() => router.push(`/quotes/${q.id}`)}
                      title="Delete"
                    >
                      Delete
                    </button> */}
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
  quotes.sort((a, b) =>
    compareDesc(
      parse(a.created, "dd/MM/yyyy", new Date()),
      parse(b.created, "dd/MM/yyyy", new Date())
    )
  );
  return {
    props: {
      quotes,
    },
  };
};

export default Dashboard;
