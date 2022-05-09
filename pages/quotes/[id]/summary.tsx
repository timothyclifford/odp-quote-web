import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Layout } from "../../../components/Layout";
import { QuoteNavigation } from "../../../components/QuoteNavigation";
import { Heading2 } from "../../../components/Heading2";
import { Heading3 } from "../../../components/Heading3";
import { Row } from "../../../components/Row";
import { useState } from "react";
import { TextAreaField } from "../../../components/fields/TextArea";
import { InputField } from "../../../components/fields/InputField";
import { InclusionsService } from "../../../domain/inclusions/extraService";
import {
  buildInclusions,
  Inclusion,
  Inclusions,
} from "../../../domain/inclusions/inclusion";

type Props = {
  quoteId: string;
  data: Inclusions;
};

const EditQuote: NextPage<Props> = ({ quoteId, data }) => {
  const [inclusions, setInclusions] = useState(data.inclusions);
  const [exclusions, setExclusions] = useState(data.exclusions);
  const [comments, setComments] = useState(data.comments);
  const [discountCode, setDiscountCode] = useState(data.discountCode);
  const toggleIncluded = (name: string, checked: boolean) => {
    const updated: Array<Inclusion> = [];
    for (let x = 0; x < inclusions.length; x++) {
      if (inclusions[x].name === name) {
        updated.push({ name, included: checked });
      } else {
        updated.push(inclusions.slice(x, x + 1)[0]);
      }
    }
    setInclusions(updated);
  };
  const toggleExcluded = (name: string, checked: boolean) => {
    const updated: Array<Inclusion> = [];
    for (let x = 0; x < exclusions.length; x++) {
      if (inclusions[x].name === name) {
        updated.push({ name, included: checked });
      } else {
        updated.push(exclusions.slice(x, x + 1)[0]);
      }
    }
    setExclusions(updated);
  };
  const save = async () => {
    const response = await fetch(`/api/quotes/${quoteId}/extras`, {
      method: "PUT",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        inclusions,
        exclusions,
        comments,
        discountCode,
      }),
    });
    if (response.ok) {
      alert("Saved");
    } else {
      alert("An error occurred...");
    }
  };
  return (
    <Layout>
      <Head>
        <title>{`Quote ${data.id} summary`}</title>
      </Head>
      <main>
        <QuoteNavigation></QuoteNavigation>
        <Heading2 text={`Quote ${data.id} summary`}></Heading2>
        <Heading3 text="Inclusions"></Heading3>
        {inclusions.map((inc) => {
          return (
            <Row>
              <div className="form-control w-36">
                <label className="label cursor-pointer">
                  <span className="label-text">{inc.name}</span>
                  <input
                    type="checkbox"
                    className="toggle"
                    defaultChecked={inc.included}
                    onChange={(e) => toggleIncluded(inc.name, e.target.checked)}
                  ></input>
                </label>
              </div>
            </Row>
          );
        })}
        <Heading3 text="Exclusions"></Heading3>
        {exclusions.map((exc) => {
          return (
            <Row>
              <div className="form-control w-36">
                <label className="label cursor-pointer">
                  <span className="label-text">{exc.name}</span>
                  <input
                    type="checkbox"
                    className="toggle"
                    defaultChecked={exc.included}
                    onChange={(e) => toggleExcluded(exc.name, e.target.checked)}
                  ></input>
                </label>
              </div>
            </Row>
          );
        })}
        <Heading3 text="Comments"></Heading3>
        <Row>
          <TextAreaField
            label="Comments"
            value={comments}
            onChange={(e) => setComments(e)}
          ></TextAreaField>
        </Row>
        <Heading3 text="Discount code"></Heading3>
        <Row>
          <InputField
            value={discountCode}
            onChange={(e) => setDiscountCode(e)}
          ></InputField>
        </Row>
        <Row>
          <button className="btn btn-primary" onClick={save}>
            Review quote
          </button>
        </Row>
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const quoteId = context.params!.id as string;
  const service = InclusionsService();
  let inclusions = await service.getQuoteInclusions(quoteId);
  console.log(inclusions);
  return {
    props: {
      quoteId,
      data: inclusions ?? buildInclusions(),
    },
  };
};

export default EditQuote;
