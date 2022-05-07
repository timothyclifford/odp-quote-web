import type { NextApiRequest, NextApiResponse } from "next";
import { HTTP_METHODS } from "../../../../constants";
import { AreaRepository } from "../../../../domain/area/areaRepository";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const repo = AreaRepository();
  const method = req.method?.toUpperCase();
  const quoteId = req.query.id as string;
  switch (method) {
    case HTTP_METHODS.GET: {
      const quotes = await repo.getAreaByQuoteId(quoteId);
      return res.status(200).json(quotes);
    }
    case HTTP_METHODS.PUT: {
      const quote = await repo.updateAreas(quoteId, req.body);
      return res.status(200).json(quote);
    }
    default: {
      return res.status(404).json({});
    }
  }
};

export default handler;
