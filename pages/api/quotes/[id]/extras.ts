import type { NextApiRequest, NextApiResponse } from "next";
import { HTTP_METHODS } from "../../../../lib/constants";
import { AreaRepository } from "../../../../domain/area/areaRepository";
import { ExtraRepository } from "../../../../domain/extra/extraRepository";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const repo = ExtraRepository();
  const method = req.method?.toUpperCase();
  const quoteId = req.query.id as string;
  switch (method) {
    case HTTP_METHODS.GET: {
      const quotes = await repo.getExtrasByQuoteId(quoteId);
      return res.status(200).json(quotes);
    }
    case HTTP_METHODS.PUT: {
      const quote = await repo.updateQuoteExtras(quoteId, req.body);
      return res.status(200).json(quote);
    }
    default: {
      return res.status(404).send(`${method} not supported`);
    }
  }
};

export default handler;
