import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Layout } from "../../../components/Layout";
import { QuoteNavigation } from "../../../components/QuoteNavigation";
import { Row } from "../../../components/Row";
import { useState } from "react";
import { TextAreaField } from "../../../components/fields/TextArea";
import { InputField } from "../../../components/fields/InputField";
import { Inclusion, Inclusions } from "../../../domain/inclusions/inclusion";
import { Heading1 } from "../../../components/Heading1";
import { Checkbox } from "../../../components/fields/Checkbox";
import { Card } from "../../../components/Card";
import { Label } from "../../../components/fields/Label";
import { HeadingWithAction } from "../../../components/HeadingWithAction";
import toast from "react-hot-toast";
import { CMSService } from "../../../domain/cms/cmsService";
import {
  calculateQuoteSubTotal,
  calculateQuoteTotal,
  DetailedQuote,
} from "../../../domain/quote/quote";
import { QuoteService } from "../../../domain/quote/quoteService";
import {
  calculateAreaPrice,
  calculateAreaTotalPrice,
} from "../../../domain/area/area";
import { calculateAreaItemPrice } from "../../../domain/area/areaItem";
import { calculateExtraPrice } from "../../../domain/extra/extra";

type Props = {
  quoteId: string;
  quote: DetailedQuote;
  defaultInclusions: Inclusion[];
  defaultExclusions: Inclusion[];
};

const EditQuote: NextPage<Props> = ({
  quoteId,
  quote,
  defaultInclusions,
  defaultExclusions,
}) => {
  const [subTotal] = useState(calculateQuoteSubTotal(quote));
  const [total] = useState(calculateQuoteTotal(quote));
  const [inclusions, setInclusions] = useState(
    quote.inclusions?.inclusions ?? defaultInclusions
  );
  const [exclusions, setExclusions] = useState(
    quote.inclusions?.exclusions ?? defaultExclusions
  );
  const [comments, setComments] = useState(quote.inclusions?.comments ?? "");
  const [discount, setDiscount] = useState(quote.inclusions?.discount ?? 0);
  const toggleIncluded = (name: string, checked: boolean) => {
    const updated: Array<Inclusion> = [];
    for (let x = 0; x < inclusions.length; x++) {
      if (inclusions[x].name === name) {
        updated.push({ name, default: checked });
      } else {
        updated.push(inclusions.slice(x, x + 1)[0]);
      }
    }
    setInclusions(updated);
  };
  const toggleExcluded = (name: string, checked: boolean) => {
    const updated: Array<Inclusion> = [];
    for (let x = 0; x < exclusions.length; x++) {
      if (exclusions[x].name === name) {
        updated.push({ name, default: checked });
      } else {
        updated.push(exclusions.slice(x, x + 1)[0]);
      }
    }
    setExclusions(updated);
  };
  const buildInclusions = (): Omit<Inclusions, "id"> => ({
    inclusions,
    exclusions,
    comments,
    discount,
  });
  const save = async () => {
    const response = await fetch(`/api/quotes/${quoteId}/inclusions`, {
      method: "PUT",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(buildInclusions()),
    });
    if (response.ok) {
      toast.success("Saved");
    } else {
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <Head>
        <title>{`Quote ${quoteId}`}</title>
      </Head>
      <main>
        <QuoteNavigation></QuoteNavigation>
        <Row>
          <HeadingWithAction>
            <Heading1>Quote {quoteId}</Heading1>
          </HeadingWithAction>
        </Row>
        <Card>
          <Row>
            <table className="area-items-table">
              <thead>
                <tr>
                  <th style={{ textAlign: "left" }}></th>
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
                          <td
                            style={{ textAlign: "left" }}
                            className="text-green"
                          >
                            {area.name}
                          </td>
                          <td></td>
                          <td></td>
                          <td>${calculateAreaPrice(area)}</td>
                        </tr>
                        {area.items.map((item) => (
                          <tr key={item.id}>
                            <td
                              className="text-sm"
                              style={{ textAlign: "left" }}
                            >
                              &nbsp;&nbsp;&nbsp;&nbsp;{item.name}
                            </td>
                            <td className="text-sm">${item.price}</td>
                            <td className="text-sm">{item.quantity}</td>
                            <td className="text-sm">
                              ${calculateAreaItemPrice(item)}
                            </td>
                          </tr>
                        ))}
                        {area.comment && (
                          <tr>
                            <td
                              className="text-sm"
                              style={{ textAlign: "left" }}
                            >
                              Comments
                            </td>
                            <td
                              className="text-sm"
                              colSpan={3}
                              style={{ textAlign: "right" }}
                            >
                              {area.comment}
                            </td>
                          </tr>
                        )}
                        <tr key={`${area.id}-${area.name}`}>
                          <td style={{ textAlign: "left" }} className="text-sm">
                            Total
                          </td>
                          <td></td>
                          <td></td>
                          <td className="text-sm">
                            ${calculateAreaTotalPrice(area)}
                          </td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                      </>
                    );
                  })}
                <tr>
                  <td style={{ textAlign: "left" }} className="text-green">
                    Extras
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                {quote.extras &&
                  quote.extras.map((extra) => (
                    <tr key={extra.id}>
                      <td style={{ textAlign: "left" }}>{extra.name}</td>
                      <td>${extra.price}</td>
                      <td>{extra.quantity}</td>
                      <td>${calculateExtraPrice(extra)}</td>
                    </tr>
                  ))}
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td style={{ textAlign: "left" }} className="text-green">
                    Subtotal
                  </td>
                  <td></td>
                  <td></td>
                  <td>${subTotal}</td>
                </tr>
                {discount > 0 && (
                  <tr>
                    <td style={{ textAlign: "left" }} className="text-green">
                      Discount
                    </td>
                    <td></td>
                    <td></td>
                    <td>${discount}</td>
                  </tr>
                )}
                <tr>
                  <td style={{ textAlign: "left" }} className="text-green">
                    Total
                  </td>
                  <td></td>
                  <td></td>
                  <td>${total}</td>
                </tr>
              </tbody>
            </table>
          </Row>
          <Row>
            <div className="grid grid-cols-2">
              <div>
                <Label>Inclusions</Label>
                {inclusions.map((inc) => {
                  return (
                    <div className="mb-2" key={inc.name}>
                      <Checkbox
                        label={inc.name}
                        checked={inc.default}
                        onChange={(e) =>
                          toggleIncluded(inc.name, e.target.checked)
                        }
                      ></Checkbox>
                    </div>
                  );
                })}
              </div>
              <div>
                <Label>Exclusions</Label>
                {exclusions.map((exc) => {
                  return (
                    <div className="mb-2" key={exc.name}>
                      <Checkbox
                        label={exc.name}
                        checked={exc.default}
                        onChange={(e) =>
                          toggleExcluded(exc.name, e.target.checked)
                        }
                      ></Checkbox>
                    </div>
                  );
                })}
              </div>
            </div>
          </Row>
          <Row>
            <Label>Comments</Label>
            <TextAreaField
              value={comments}
              onChange={(e) => setComments(e)}
            ></TextAreaField>
          </Row>
          <Row>
            <Label>Discount</Label>
            <InputField
              value={discount}
              type="number"
              onChange={(e) => setDiscount(parseInt(e))}
            ></InputField>
          </Row>
        </Card>
        <button className="btn" onClick={save}>
          Save
        </button>
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const quoteId = context.params!.id as string;
  const quoteService = QuoteService();
  const quote = await quoteService.getDetailedQuote(quoteId);
  const cms = CMSService();
  const defaultInclusions = await cms.getInclusions();
  const defaultExclusions = await cms.getExclusions();
  return {
    props: {
      quoteId,
      quote,
      defaultInclusions,
      defaultExclusions,
    },
  };
};

export default EditQuote;
