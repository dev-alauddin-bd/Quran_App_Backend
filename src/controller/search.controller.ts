import type { Request, Response } from 'express';
import { SearchService } from '../services/search.service.js';

// ---------------------------------------------------------------------------
// SearchController – handles HTTP requests for the search endpoint
// ---------------------------------------------------------------------------

/**
 * GET /api/search?q=<query>
 * Searches the Quran by Arabic text or English translation.
 * Returns up to 50 matching verses.
 */
export const searchQuran = (req: Request, res: Response): void => {
  const q = (req.query.q as string) ?? '';
  const results = SearchService.search(q);
  res.status(200).json(results);
};
