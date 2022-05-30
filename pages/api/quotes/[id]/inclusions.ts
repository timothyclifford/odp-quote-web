import type { NextApiRequest, NextApiResponse } from "next";
import { HTTP_METHODS } from "../../../../lib/constants";
import { InclusionRepository } from "../../../../domain/inclusions/inclusionRepository";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const repo = InclusionRepository();
  const method = req.method?.toUpperCase();
  const quoteId = req.query.id as string;
  switch (method) {
    case HTTP_METHODS.GET: {
      const inclusions = await repo.getInclusionsByQuoteId(quoteId);
      if (inclusions === undefined) {
        return res.status(404).send("Not found");
      }
      return res.status(200).json(inclusions);
    }
    case HTTP_METHODS.PUT: {
      const inclusions = await repo.updateQuoteInclusions(quoteId, req.body);
      return res.status(200).json(inclusions);
    }
    default: {
      return res.status(404).send(`${method} not supported`);
    }
  }
};

export default handler;
