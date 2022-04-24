import type { NextApiRequest, NextApiResponse } from 'next'
import { Quote } from '../../domain/quote/quote';
import { QuoteService } from '../../domain/quote/quoteService';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Quote | {}>
) {
  const service = QuoteService();
  if (req.method?.toUpperCase() === "GET") {
    const quotes = service.getAll();
    res.status(200).json(quotes)
  }
  else if (req.method?.toUpperCase() === "POST") {
    const quote = service.createQuote(req.body);
    res.status(200).json(quote)
  } else if (req.method?.toUpperCase() === "PUT") {
    const quote = service.updateQuote(req.body);
    res.status(200).json(quote)
  } else {
    res.status(404).json({})
  }
}