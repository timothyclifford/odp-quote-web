import { customAlphabet } from "nanoid";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Heading1 } from "../../components/Heading1";
import { InputField } from "../../components/InputField";
import { Layout } from "../../components/Layout";
import { Navigation } from "../../components/Navigation";
import { Row } from "../../components/Row";

const quoteId = customAlphabet("123456789", 8)();

const CreateQuote: NextPage = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [suburb, setSuburb] = useState("");
  const [postcode, setPostcode] = useState("");
  const save = async () => {
    const response = await fetch(`/api/quotes/`, {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        street,
        suburb,
        postcode,
      }),
    });
    if (response.ok) {
      router.push(`/quotes/${quoteId}`);
    } else {
      alert("An error occurred...");
    }
  };
  return (
    <Layout>
      <Head>
        <title>New Quote</title>
      </Head>
      <main>
        <Heading1 text="New quote"></Heading1>
        <Navigation></Navigation>
        <Row>
          <InputField
            id="id"
            label="ID"
            value={quoteId}
            disabled={true}
          ></InputField>
        </Row>
        <Row>
          <InputField
            id="firstName"
            label="First name"
            onChange={setFirstName}
          ></InputField>
        </Row>
        <Row>
          <InputField
            id="lastName"
            label="Last name"
            onChange={setLastName}
          ></InputField>
        </Row>
        <Row>
          <InputField
            id="email"
            label="Email"
            type="email"
            onChange={setEmail}
          ></InputField>
        </Row>
        <Row>
          <InputField
            id="phone"
            label="Phone"
            type="phone"
            onChange={setPhone}
          ></InputField>
        </Row>
        <Row>
          <InputField
            id="street"
            label="Street"
            onChange={setStreet}
          ></InputField>
        </Row>
        <Row>
          <InputField
            id="suburb"
            label="Suburb"
            onChange={setSuburb}
          ></InputField>
        </Row>
        <Row>
          <InputField
            id="postcode"
            label="Postcode"
            onChange={setPostcode}
          ></InputField>
        </Row>
        <Row>
          <button className="btn btn-primary" onClick={() => save()}>
            Save
          </button>
        </Row>
      </main>
      <footer></footer>
    </Layout>
  );
};

export default CreateQuote;
