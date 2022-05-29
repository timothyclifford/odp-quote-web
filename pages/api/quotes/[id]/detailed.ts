import type { NextApiRequest, NextApiResponse } from "next";
import { HTTP_METHODS } from "../../../../lib/constants";
import { QuoteRepository } from "../../../../domain/quote/quoteRepository";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const repo = QuoteRepository();
  const method = req.method?.toUpperCase();
  const id = req.query.id as string;
  switch (method) {
    case HTTP_METHODS.GET: {
      const quotes = await repo.getDetailedQuoteById(id);
      return res.status(200).json(quotes);
    }
    default: {
      return res.status(404).send(`${method} not supported`);
    }
  }
};

export default handler;
