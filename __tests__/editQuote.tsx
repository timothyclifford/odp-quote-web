import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import EditQuote from "../pages/quotes/[id]";
import { stubQuote } from "../domain/quote/quote";

const quote = stubQuote();

const useRouter = jest.spyOn(require("next/router"), "useRouter");

describe("EditQuote", () => {
  it("renders the page", () => {
    const router = { push: jest.fn(), asPath: "/abc/def/ghi", pathname: "" };
    useRouter.mockReturnValue(router);
    // bla
    render(<EditQuote data={quote} />);
  });
});
