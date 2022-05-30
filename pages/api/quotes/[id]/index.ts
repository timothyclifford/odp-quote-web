import type { NextApiRequest, NextApiResponse } from "next";
import { HTTP_METHODS } from "../../../../lib/constants";
import { QuoteRepository } from "../../../../domain/quote/quoteRepository";
import { withSentry } from "@sentry/nextjs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const repo = QuoteRepository();
  const method = req.method?.toUpperCase();
  const id = req.query.id as string;
  switch (method) {
    case HTTP_METHODS.GET: {
      const quote = await repo.getQuoteById(id);
      if (quote === undefined) {
        return res.status(404).send("Not found");
      }
      return res.status(200).json(quote);
    }
    case HTTP_METHODS.PUT: {
      const quote = await repo.updateQuote(req.body);
      return res.status(200).json(quote);
    }
    case HTTP_METHODS.DELETE: {
      await repo.deleteQuote(id);
      return res.status(200).json({});
    }
    default: {
      return res.status(404).send(`${method} not supported`);
    }
  }
};

export default withSentry(handler);
