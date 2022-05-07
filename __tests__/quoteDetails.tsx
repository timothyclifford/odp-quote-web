import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QuoteForm } from "../components/forms/QuoteForm";
import { stubQuote } from "../domain/quote/quote";

const quote = stubQuote();

describe("QuoteForm", () => {
  it("renders the page", () => {
    render(<QuoteForm quote={quote} onSubmit={() => {}} />);
  });
});
