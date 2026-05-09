import { DataProvider } from '../models/quran.model.js';

// ---------------------------------------------------------------------------
// SurahService – business logic for surah-related API operations
// ---------------------------------------------------------------------------

export class SurahService {
  /** Returns the full list of surah metadata (chapters). */
  static listSurahs(): any[] {
    return DataProvider.getSurahs();
  }

  /** Returns a single surah with all its verses by id, or undefined. */
  static getSurah(id: number) {
    return DataProvider.getSurahById(id);
  }
}
