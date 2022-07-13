import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Layout } from "../../../components/Layout";
import { QuoteNavigation } from "../../../components/QuoteNavigation";
import { Row } from "../../../components/Row";
import { useState } from "react";
import { TextAreaField } from "../../../components/fields/TextArea";
import { InputField } from "../../../components/fields/InputField";
import { InclusionsService } from "../../../domain/inclusions/inclusionsService";
import {
  buildInclusions,
  Inclusion,
  Inclusions,
} from "../../../domain/inclusions/inclusion";
import { Heading1 } from "../../../components/Heading1";
import { Checkbox } from "../../../components/fields/Checkbox";
import { Card } from "../../../components/Card";
import { Label } from "../../../components/fields/Label";
import { HeadingWithAction } from "../../../components/HeadingWithAction";
import toast from "react-hot-toast";
import { PricingService } from "../../../domain/pricing/pricingService";

type Props = {
  quoteId: string;
  data: Inclusions;
};

const EditQuote: NextPage<Props> = ({ quoteId, data }) => {
  const [inclusions, setInclusions] = useState(data.inclusions);
  const [exclusions, setExclusions] = useState(data.exclusions);
  const [comments, setComments] = useState(data.comments);
  const [discount, setDiscount] = useState(data.discount);
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
    discount: discount,
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
  const pricingService = PricingService();
  const inclusions = await pricingService.getInclusions();
  const exclusions = await pricingService.getExclusions();
  const inclusionsService = InclusionsService();
  const defaultInclusions = buildInclusions(inclusions, exclusions);
  let savedData = await inclusionsService.getQuoteInclusions(quoteId);
  return {
    props: {
      quoteId,
      data: savedData ?? defaultInclusions,
    },
  };
};

export default EditQuote;
