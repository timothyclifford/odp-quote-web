import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateQuote from "../pages/quotes/new";

const fieldLabels = [
  "Quote number",
  "First name",
  "Last name",
  "Email",
  "Phone",
  "Street",
  "Suburb",
  "Postcode",
];

describe("CreateQuote", () => {
  it("renders the page", () => {
    render(<CreateQuote />);

    for (const label of fieldLabels) {
      const field = screen.getByText(label);
      expect(field).toBeInTheDocument();
    }
  });
});
