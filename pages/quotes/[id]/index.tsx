import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormField } from "../../../components/FormField";
import { Quote } from "../../../domain/quote/quote";
import { QuoteService } from "../../../domain/quote/quoteService";

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
    <div>
      <Head>
        <title>Edit Quote</title>
      </Head>
      <main>
        <h1>{`Edit quote ${quote.id}`}</h1>
        <div>
          <button onClick={() => router.push("/")}>Home</button>
        </div>
        <FormField
          id="id"
          label="ID"
          value={quote.id}
          disabled={true}
        ></FormField>
        <FormField
          id="firstName"
          label="First name"
          value={firstName}
          onChange={setFirstName}
        ></FormField>
        <FormField
          id="lastName"
          label="Last name"
          value={lastName}
          onChange={setLastName}
        ></FormField>
        <FormField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
        ></FormField>
        <FormField
          id="phone"
          label="Phone"
          type="phone"
          value={phone}
          onChange={setPhone}
        ></FormField>
        <FormField
          id="street"
          label="Street"
          value={street}
          onChange={setStreet}
        ></FormField>
        <FormField
          id="suburb"
          label="Suburb"
          value={suburb}
          onChange={setSuburb}
        ></FormField>
        <FormField
          id="postcode"
          label="Postcode"
          value={postcode}
          onChange={setPostcode}
        ></FormField>
        <div>
          <button onClick={() => save()}>Save</button>
        </div>
      </main>
      <footer></footer>
    </div>
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
