import "@testing-library/jest-dom";
import { stubQuote } from "../domain/quote/quote";
import { QuoteRepository } from "../domain/quote/quoteRepository";

const quote = stubQuote();

// test("create a quote", async () => {
//   const repo = QuoteRepository();
//   console.log(repo);
//   await repo.createQuote(quote);
// });
