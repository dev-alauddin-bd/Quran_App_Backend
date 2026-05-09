import type { Request, Response } from 'express';
import { SurahService } from '../services/surah.service.js';

// ---------------------------------------------------------------------------
// SurahController – handles HTTP requests for surah-related endpoints
// ---------------------------------------------------------------------------

/**
 * GET /api/surahs
 * Returns the metadata for all 114 Surahs.
 */
export const getAllSurahs = (req: Request, res: Response): void => {
  const surahs = SurahService.listSurahs();
  res.status(200).json(surahs);
};

/**
 * GET /api/surah/:id
 * Returns a single Surah (with all its Ayahs) by its numeric id.
 */
export const getSurah = (req: Request, res: Response): void => {
  const id = Number(req.params.id);

  if (isNaN(id) || id < 1 || id > 114) {
    res.status(400).json({ error: 'Invalid surah id. Must be a number between 1 and 114.' });
    return;
  }

  const surah = SurahService.getSurah(id);
  if (surah) {
    res.status(200).json(surah);
  } else {
    res.status(404).json({ error: `Surah ${id} not found.` });
  }
};
