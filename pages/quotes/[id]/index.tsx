import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { InputField } from "../../../components/InputField";
import { Heading1 } from "../../../components/Heading1";
import { Layout } from "../../../components/Layout";
import { Row } from "../../../components/Row";
import { Quote } from "../../../domain/quote/quote";
import { QuoteService } from "../../../domain/quote/quoteService";
import { Navigation } from "../../../components/Navigation";

type Props = {
  quote: Quote;
};

const EditQuote: NextPage<Props> = ({ quote }) => {
  const router = useRouter();
  const [firstName, setFirstName] = useState(quote.firstName);
  const [lastName, setLastName] = useState(quote.lastName);
  const [email, setEmail] = useState(quote.email);
  const [phone, setPhone] = useState(quote.phone);
  const [street, setStreet] = useState(quote.street);
  const [suburb, setSuburb] = useState(quote.suburb);
  const [postcode, setPostcode] = useState(quote.postcode);
  const save = async () => {
    const response = await fetch(`/api/quotes/`, {
      method: "PUT",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        id: quote.id,
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
      router.push(`/quotes`);
    } else {
      alert("An error occurred...");
    }
  };
  return (
    <Layout>
      <Head>
        <title>Edit Quote</title>
      </Head>
      <main>
        <Heading1 text={`Edit quote ${quote.id}`}></Heading1>
        <Navigation quoteId={quote.id}></Navigation>
        <InputField label="ID" value={quote.id} disabled={true}></InputField>
        <InputField
          label="First name"
          value={firstName}
          onChange={setFirstName}
        ></InputField>
        <InputField
          label="Last name"
          value={lastName}
          onChange={setLastName}
        ></InputField>
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
        ></InputField>
        <InputField
          label="Phone"
          type="phone"
          value={phone}
          onChange={setPhone}
        ></InputField>
        <InputField
          label="Street"
          value={street}
          onChange={setStreet}
        ></InputField>
        <InputField
          label="Suburb"
          value={suburb}
          onChange={setSuburb}
        ></InputField>
        <InputField
          label="Postcode"
          value={postcode}
          onChange={setPostcode}
        ></InputField>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params!.id as string;
  const service = QuoteService();
  const quote = service.getById(id);
  return {
    props: {
      quote: {
        id: "1234",
        firstName: "Bob",
        lastName: "Bobson",
        email: "bob@bobson.com",
        phone: "0400000000",
        street: "123 Bob St",
        suburb: "Bobville",
        postcode: "3210",
      },
    },
  };
};

export default EditQuote;
