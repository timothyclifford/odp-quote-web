import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Layout } from "../../../components/Layout";
import { DetailedQuote, Quote } from "../../../domain/quote/quote";
import { QuoteService } from "../../../domain/quote/quoteService";
import { QuoteNavigation } from "../../../components/QuoteNavigation";
import { Heading1 } from "../../../components/Heading1";
import { Row } from "../../../components/Row";
import { HeadingWithAction } from "../../../components/HeadingWithAction";
import { Card } from "../../../components/Card";
import { Heading2 } from "../../../components/Heading2";
import toast from "react-hot-toast";
import {
  calculateAreaPrice,
  calculateAreaTotalPrice,
} from "../../../domain/area/area";
import { calculateExtraPrice } from "../../../domain/extra/extra";
import { calculateAreaItemPrice } from "../../../domain/area/areaItem";

type Props = {
  quote: DetailedQuote;
};

const EmailQuote: NextPage<Props> = ({ quote }) => {
  const calculateSubTotal = (quote: DetailedQuote): number => {
    const areasPrice = quote.areas
      .map((x) => calculateAreaTotalPrice(x))
      .reduce((previous, next) => previous + next);
    const extrasPrice = quote.extras
      .map((x) => calculateExtraPrice(x))
      .reduce((previous, next) => previous + next);

    return areasPrice + extrasPrice;
  };

  const calculateDiscount = (quote: DetailedQuote): number => {
    const subtotal = calculateSubTotal(quote);

    return subtotal / quote.inclusions.discount;
  };

  const calculateTotal = (quote: DetailedQuote): number => {
    const subtotal = calculateSubTotal(quote);
    const discount = calculateDiscount(quote);

    return subtotal - discount;
  };

  const emailQuote = async () => {
    const really = confirm("Are you sure you want to email?");
    if (really) {
      const response = await fetch(`/api/quotes/${quote.id}/email`, {
        method: "POST",
      });
      if (response.ok) {
        toast.success("Saved");
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <Layout>
      <Head>
        <title>{`Quote ${quote.id}`}</title>
      </Head>
      <main>
        <QuoteNavigation></QuoteNavigation>
        <Row>
          <HeadingWithAction>
            <Heading1>Quote {quote.id}</Heading1>
          </HeadingWithAction>
        </Row>

        <Card>
          <Row>
            <p>Dear {quote.firstName}</p>
            <p>
              One Day Paint are pleased to offer your the following quote for
              painting.
            </p>
          </Row>

          <Row>
            <table className="area-items-table">
              <thead>
                <tr>
                  <th style={{ textAlign: "left" }}>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {quote.areas &&
                  quote.areas.map((area) => {
                    return (
                      <>
                        <tr key={area.id}>
                          <td style={{ textAlign: "left" }}>{area.name}</td>
                          <td className="w-32"></td>
                          <td></td>
                          <td>${calculateAreaPrice(area)}</td>
                        </tr>
                        {area.items.map((item) => (
                          <tr key={item.id}>
                            <td
                              className="text-sm"
                              style={{ textAlign: "left" }}
                            >
                              {item.name}
                            </td>
                            <td className="w-32">${item.price}</td>
                            <td>{item.quantity}</td>
                            <td>${calculateAreaItemPrice(item)}</td>
                          </tr>
                        ))}
                        <tr key={area.id}>
                          <td style={{ textAlign: "left" }}>
                            {area.name} total
                          </td>
                          <td className="w-32"></td>
                          <td></td>
                          <td>${calculateAreaTotalPrice(area)}</td>
                        </tr>
                      </>
                    );
                  })}
                <tr>
                  <td style={{ textAlign: "left" }}>Extras</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                {quote.extras &&
                  quote.extras.map((extra) => (
                    <tr key={extra.id}>
                      <td style={{ textAlign: "left" }}>{extra.name}</td>
                      <td className="w-32">{extra.price}</td>
                      <td>{extra.quantity}</td>
                      <td>${calculateExtraPrice(extra)}</td>
                    </tr>
                  ))}
                <tr>
                  <td style={{ textAlign: "left" }}>Subtotal</td>
                  <td></td>
                  <td></td>
                  <td>${calculateSubTotal(quote)}</td>
                </tr>
                <tr>
                  <td style={{ textAlign: "left" }}>Discount</td>
                  <td></td>
                  <td></td>
                  <td>${calculateDiscount(quote)}</td>
                </tr>
                <tr>
                  <td style={{ textAlign: "left" }}>Total</td>
                  <td></td>
                  <td></td>
                  <td>${calculateTotal(quote)}</td>
                </tr>
              </tbody>
            </table>
          </Row>
          <Row>
            <div className="grid grid-cols-2">
              <div>
                <div className="mb-2">
                  <Heading2>Inclusions</Heading2>
                </div>
                {quote.inclusions.inclusions
                  .filter((x) => x.included)
                  .map((x) => {
                    return (
                      <div key={x.name} className="mb-2">
                        ✅ {x.name}
                      </div>
                    );
                  })}
              </div>
              <div>
                <div className="mb-2">
                  <Heading2>Exclusions</Heading2>
                </div>
                {quote.inclusions.exclusions
                  .filter((x) => x.included)
                  .map((x) => {
                    return (
                      <div key={x.name} className="mb-2">
                        ❌ {x.name}
                      </div>
                    );
                  })}
              </div>
            </div>
          </Row>
          <Row>
            <Heading2>Comments</Heading2>
          </Row>
          <Row>{quote.inclusions.comments}</Row>
        </Card>
        <Row>
          <button className="btn" onClick={() => emailQuote()}>
            Email quote to customer
          </button>
        </Row>
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const quoteId = context.params!.id as string;
  const service = QuoteService();
  const quote = await service.getDetailedQuote(quoteId);
  if (quote === undefined) {
    throw Error(`Unable to find quote ${quoteId}`);
  }
  return {
    props: {
      quote,
    },
  };
};

export default EmailQuote;
