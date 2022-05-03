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
  const id = req.query.id as string;
  switch (method) {
    case HTTP_METHODS.GET: {
      const quotes = repo.getQuoteById(id);
      res.status(200).json(quotes);
    }
    case HTTP_METHODS.PUT: {
      const quote = repo.updateQuote(req.body);
      res.status(200).json(quote);
    }
    case HTTP_METHODS.DELETE: {
      const quote = repo.deleteQuote(id);
      res.status(200).json(quote);
    }
    default: {
      res.status(404).json({});
    }
  }
}
