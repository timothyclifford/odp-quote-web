import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import QuoteDetails from "../pages/quotes/[id]/details";

const quote = {
  id: "1234",
  firstName: "Bob",
  lastName: "Bobson",
  email: "bob@bobson.com",
  phone: "0400000000",
  street: "123 Bob St",
  suburb: "Bobville",
  postcode: "3210",
};

describe("Details", () => {
  it("renders the page", () => {
    render(<QuoteDetails quote={quote} />);
  });
});
