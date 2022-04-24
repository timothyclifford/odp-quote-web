import { customAlphabet } from "nanoid";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormField } from "../../components/FormField";

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
    <div>
      <Head>
        <title>New Quote</title>
      </Head>
      <main>
        <h1>New quote</h1>
        <div>
          <button onClick={() => router.push("/")}>Home</button>
        </div>
        <FormField
          id="id"
          label="ID"
          value={quoteId}
          disabled={true}
        ></FormField>
        <FormField
          id="firstName"
          label="First name"
          onChange={setFirstName}
        ></FormField>
        <FormField
          id="lastName"
          label="Last name"
          onChange={setLastName}
        ></FormField>
        <FormField
          id="email"
          label="Email"
          type="email"
          onChange={setEmail}
        ></FormField>
        <FormField
          id="phone"
          label="Phone"
          type="phone"
          onChange={setPhone}
        ></FormField>
        <FormField id="street" label="Street" onChange={setStreet}></FormField>
        <FormField id="suburb" label="Suburb" onChange={setSuburb}></FormField>
        <FormField
          id="postcode"
          label="Postcode"
          onChange={setPostcode}
        ></FormField>
        <button onClick={() => save()}>Save</button>
      </main>
      <footer></footer>
    </div>
  );
};

export default CreateQuote;
