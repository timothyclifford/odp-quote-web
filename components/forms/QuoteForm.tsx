import { useState } from "react";
import { QuoteMutation, Quote } from "../../domain/quote/quote";
import { InputField } from "../fields/InputField";
import { Row } from "../Row";

type Props = {
  quote?: QuoteMutation;
  onSubmit: (quote: QuoteMutation) => void;
};

export const QuoteForm = ({ quote, onSubmit }: Props) => {
  const [firstName, setFirstName] = useState(quote?.firstName ?? "");
  const [lastName, setLastName] = useState(quote?.lastName ?? "");
  const [email, setEmail] = useState(quote?.email ?? "");
  const [phone, setPhone] = useState(quote?.phone ?? "");
  const [street, setStreet] = useState(quote?.street ?? "");
  const [suburb, setSuburb] = useState(quote?.suburb ?? "");
  const [postcode, setPostcode] = useState(quote?.postcode ?? "");
  const saveQuote = () => {
    onSubmit({
      id: quote!.id,
      firstName,
      lastName,
      email,
      phone,
      street,
      suburb,
      postcode,
    });
  };
  return (
    <>
      <Row>
        <InputField label="ID" value={quote!.id} disabled={true}></InputField>
      </Row>
      <Row>
        <InputField
          label="First name"
          value={firstName}
          onChange={setFirstName}
        ></InputField>
      </Row>
      <Row>
        <InputField
          label="Last name"
          value={lastName}
          onChange={setLastName}
        ></InputField>
      </Row>
      <Row>
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
        ></InputField>
      </Row>
      <Row>
        <InputField
          label="Phone"
          type="phone"
          value={phone}
          onChange={setPhone}
        ></InputField>
      </Row>
      <Row>
        <InputField
          label="Street"
          value={street}
          onChange={setStreet}
        ></InputField>
      </Row>
      <Row>
        <InputField
          label="Suburb"
          value={suburb}
          onChange={setSuburb}
        ></InputField>
      </Row>
      <Row>
        <InputField
          label="Postcode"
          value={postcode}
          onChange={setPostcode}
        ></InputField>
      </Row>
      <Row>
        <button className="btn btn-primary" onClick={saveQuote}>
          Save
        </button>
      </Row>
    </>
  );
};
