import type { NextApiRequest, NextApiResponse } from "next";
import { HTTP_METHODS } from "../../../lib/constants";
import { QuoteRepository } from "../../../domain/quote/quoteRepository";
import { withSentry } from "@sentry/nextjs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const repo = QuoteRepository();
  const method = req.method?.toUpperCase();
  switch (method) {
    case HTTP_METHODS.GET: {
      const quotes = await repo.getAllQuotes();
      return res.status(200).json(quotes);
    }
    case HTTP_METHODS.POST: {
      const quote = await repo.createQuote(req.body);
      return res.status(200).json(quote);
    }
    default: {
      return res.status(404).send(`${method} not supported`);
    }
  }
};

export default withSentry(handler);
