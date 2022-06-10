import { useSession } from "next-auth/react";
import { FormEvent, FormEventHandler, useState } from "react";
import { QuoteMutation } from "../../domain/quote/quote";
import { Card } from "../Card";
import { InputField } from "../fields/InputField";
import { Row } from "../Row";

type Props = {
  quote?: QuoteMutation;
  onSubmit: (quote: QuoteMutation) => void;
};

export const QuoteForm = ({ quote, onSubmit }: Props) => {
  const session = useSession();
  const [salesPerson] = useState(
    quote?.salesPerson ?? session?.data?.user?.name ?? "One Day Paint"
  );
  const [firstName, setFirstName] = useState(quote?.firstName ?? "");
  const [lastName, setLastName] = useState(quote?.lastName ?? "");
  const [email, setEmail] = useState(quote?.email ?? "");
  const [phone, setPhone] = useState(quote?.phone ?? "");
  const [street, setStreet] = useState(quote?.street ?? "");
  const [suburb, setSuburb] = useState(quote?.suburb ?? "");
  const [postcode, setPostcode] = useState(quote?.postcode ?? "");
  const saveQuote = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: quote!.id,
      salesPerson,
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
    <form onSubmit={saveQuote}>
      <Card>
        <Row>
          <InputField
            label="Quote number"
            value={quote!.id}
            disabled={true}
          ></InputField>
        </Row>
        <Row>
          <InputField
            label="Sales person"
            value={quote?.salesPerson}
            disabled={true}
          ></InputField>
        </Row>
        <Row>
          <InputField
            label="First name"
            value={firstName}
            required={true}
            onChange={setFirstName}
          ></InputField>
        </Row>
        <Row>
          <InputField
            label="Last name"
            value={lastName}
            required={true}
            onChange={setLastName}
          ></InputField>
        </Row>
        <Row>
          <InputField
            label="Email"
            type="email"
            value={email}
            required={true}
            onChange={setEmail}
          ></InputField>
        </Row>
        <Row>
          <InputField
            label="Phone"
            type="phone"
            value={phone}
            required={true}
            onChange={setPhone}
          ></InputField>
        </Row>
        <Row>
          <InputField
            label="Street"
            value={street}
            required={true}
            onChange={setStreet}
          ></InputField>
        </Row>
        <Row>
          <InputField
            label="Suburb"
            value={suburb}
            required={true}
            onChange={setSuburb}
          ></InputField>
        </Row>
        <Row>
          <InputField
            label="Postcode"
            value={postcode}
            required={true}
            onChange={setPostcode}
          ></InputField>
        </Row>
      </Card>
      <input type="submit" className="btn" value="Save"></input>
    </form>
  );
};
