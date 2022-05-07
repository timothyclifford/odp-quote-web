import type { NextApiRequest, NextApiResponse } from "next";
import { HTTP_METHODS } from "../../../../constants";
import { QuoteRepository } from "../../../../domain/quote/quoteRepository";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const repo = QuoteRepository();
  const method = req.method?.toUpperCase();
  const id = req.query.id as string;
  switch (method) {
    case HTTP_METHODS.GET: {
      const quotes = await repo.getQuoteById(id);
      return res.status(200).json(quotes);
    }
    case HTTP_METHODS.PUT: {
      const quote = await repo.updateQuote(req.body);
      return res.status(200).json(quote);
    }
    case HTTP_METHODS.DELETE: {
      const quote = await repo.deleteQuote(id);
      return res.status(200).json(quote);
    }
    default: {
      return res.status(404).json({});
    }
  }
};

export default handler;
