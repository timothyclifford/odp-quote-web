import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Layout } from "../../../components/Layout";
import { Quote } from "../../../domain/quote/quote";
import { QuoteService } from "../../../domain/quote/quoteService";
import { QuoteNavigation } from "../../../components/QuoteNavigation";
import { Heading1 } from "../../../components/Heading1";
import { Row } from "../../../components/Row";
import { HeadingWithAction } from "../../../components/HeadingWithAction";

type Props = {
  data: Quote;
};

const EmailQuote: NextPage<Props> = ({ data }) => {
  return (
    <Layout>
      <Head>
        <title>{`Quote ${data.id}`}</title>
      </Head>
      <main>
        <QuoteNavigation></QuoteNavigation>
        <Row>
          <HeadingWithAction>
            <Heading1>Quote {data.id}</Heading1>
          </HeadingWithAction>
        </Row>
      </main>
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

export default EmailQuote;
