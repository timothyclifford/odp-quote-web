import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Layout } from "../../../components/Layout";
import {
  calculateQuoteDiscount,
  calculateQuoteSubTotal,
  calculateQuoteTotal,
  DetailedQuote,
  getAddress,
} from "../../../domain/quote/quote";
import { QuoteService } from "../../../domain/quote/quoteService";
import { QuoteNavigation } from "../../../components/QuoteNavigation";
import { Heading1 } from "../../../components/Heading1";
import { Row } from "../../../components/Row";
import { HeadingWithAction } from "../../../components/HeadingWithAction";
import { Card } from "../../../components/Card";
import { Heading2 } from "../../../components/Heading2";
import toast from "react-hot-toast";
import { calculateAreaTotalPrice } from "../../../domain/area/area";
import { calculateExtraPrice } from "../../../domain/extra/extra";
import { useState } from "react";
import { format } from "date-fns";

var currency = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
});

type Props = {
  quote: DetailedQuote;
};

const EmailQuote: NextPage<Props> = ({ quote }) => {
  const [subTotal] = useState(calculateQuoteSubTotal(quote));
  const [discount] = useState(calculateQuoteDiscount(quote));
  const [total] = useState(calculateQuoteTotal(quote));

  const emailQuote = async () => {
    const really = confirm("Are you sure you want to email?");
    if (really) {
      const response = await fetch(`/api/quotes/${quote.id}/email`, {
        method: "POST",
      });
      if (response.ok) {
        toast.success("Email sent");
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
            <div className="text-sm">
              <p>{format(new Date(), "dd/MM/yyyy")}</p>
              <p>
                Attention: {quote.firstName} {quote.lastName}
              </p>
              <p>{quote.email}</p>
              <p>{quote.phone}</p>
              <p>{getAddress(quote)}</p>
            </div>
          </Row>
          <Row>
            <p>
              Dear {quote.firstName},<br></br>
            </p>
            <p>&nbsp;</p>
            <p>
              Further to our visit, we are pleased to provide you with a quote
              to undertake the following painting works;
            </p>
            <p>&nbsp;</p>
          </Row>
          <Row>
            <table className="area-items-table">
              <thead>
                <tr>
                  <th style={{ textAlign: "left" }}>Description</th>
                  <th>Amount (incl. GST)</th>
                </tr>
              </thead>
              <tbody>
                {quote.areas &&
                  quote.areas.map((area) => {
                    return (
                      <>
                        <tr key={area.id}>
                          <td style={{ textAlign: "left" }}>
                            <div>{area.name}</div>
                            {area.items.map((item) => (
                              <div key={item.id} className="text-sm">
                                • {item.name} x {item.quantity}
                              </div>
                            ))}
                          </td>
                          <td>
                            {currency.format(calculateAreaTotalPrice(area))}
                          </td>
                        </tr>
                      </>
                    );
                  })}
                <tr>
                  <td style={{ textAlign: "left" }} className="text-green">
                    Extras
                  </td>
                  <td></td>
                </tr>
                {quote.extras &&
                  quote.extras.map((extra) => (
                    <tr key={extra.id}>
                      <td style={{ textAlign: "left" }}>{extra.name}</td>
                      <td>{currency.format(calculateExtraPrice(extra))}</td>
                    </tr>
                  ))}
                {discount > 0 && (
                  <>
                    <tr>
                      <td style={{ textAlign: "left" }} className="text-green">
                        Subtotal
                      </td>
                      <td>{currency.format(subTotal)}</td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left" }} className="text-green">
                        Discount ({quote.inclusions?.discount}%)
                      </td>
                      <td>{currency.format(discount)}</td>
                    </tr>
                  </>
                )}
                <tr>
                  <td style={{ textAlign: "left" }} className="text-green">
                    Total (incl. GST)
                  </td>
                  <td>{currency.format(total)}</td>
                </tr>
              </tbody>
            </table>
          </Row>
          {quote.inclusions && (
            <Row>
              <table className="area-items-table">
                <tbody>
                  {quote.inclusions.comments && (
                    <tr>
                      <td
                        style={{ textAlign: "left" }}
                        className="bg-gray-300 w-48"
                      >
                        Comments:
                      </td>
                      <td style={{ textAlign: "left" }}>
                        {quote.inclusions.comments}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td
                      style={{ textAlign: "left" }}
                      className="bg-gray-300 w-48"
                    >
                      Also included:
                    </td>
                    <td style={{ textAlign: "left" }}>
                      {quote.inclusions.inclusions
                        .filter((x) => x.default)
                        .map((x) => {
                          return (
                            <div key={x.name} className="mb-2">
                              ✅ {x.name}
                            </div>
                          );
                        })}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ textAlign: "left" }}
                      className="bg-gray-300 w-48"
                    >
                      Exclusions:
                    </td>
                    <td style={{ textAlign: "left" }}>
                      {quote.inclusions.exclusions
                        .filter((x) => x.default)
                        .map((x) => {
                          return (
                            <div key={x.name} className="mb-2">
                              ❌ {x.name}
                            </div>
                          );
                        })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Row>
          )}
          <Row>
            <p>&nbsp;</p>
            <p>Yours sincerely,</p>
            <p>&nbsp;</p>
            <p>{quote.salesPerson}</p>
            <p>One Day Paint</p>
          </Row>
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
  const quoteService = QuoteService();
  const quote = await quoteService.getDetailedQuote(quoteId);
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
