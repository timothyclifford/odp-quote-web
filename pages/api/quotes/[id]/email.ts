import type { NextApiRequest, NextApiResponse } from "next";
import { HTTP_METHODS } from "../../../../lib/constants";
import { QuoteRepository } from "../../../../domain/quote/quoteRepository";
import { EmailClient } from "../../../../lib/emailClient";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const repo = QuoteRepository();
  const method = req.method?.toUpperCase();
  const id = req.query.id as string;
  switch (method) {
    case HTTP_METHODS.POST: {
      const emailCient = EmailClient();
      const quote = await repo.getDetailedQuoteById(id);
      if (quote === undefined) {
        return res.status(404).send("Not found");
      }
      emailCient.send("tim.cliford@gmail.com", quote);
      return res.status(200).send("Email sent");
    }
    default: {
      return res.status(404).send(`${method} not supported`);
    }
  }
};

export default handler;
