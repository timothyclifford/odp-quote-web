import type { NextApiRequest, NextApiResponse } from "next";
import { HTTP_METHODS } from "../../../constants";
import { Quote } from "../../../domain/quote/quote";
import { QuoteRepository } from "../../../domain/quote/quoteRepository";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Quote | {}>
) {
  const repo = QuoteRepository();
  const method = req.method?.toUpperCase();
  switch (method) {
    case HTTP_METHODS.GET: {
      const quotes = repo.getAllQuotes();
      res.status(200).json(quotes);
    }
    case HTTP_METHODS.POST: {
      const quote = repo.createQuote(req.body);
      res.status(200).json(quote);
    }
    default: {
      res.status(404).json({});
    }
  }
}
