import { DataProvider } from '../models/quran.model.js';

// ---------------------------------------------------------------------------
// SearchService – handles full-text search across Arabic and English content
// ---------------------------------------------------------------------------

export class SearchService {
  /**
   * Searches all Quran verses by Arabic text or English translation.
   * Returns up to 50 results to keep the response payload manageable.
   */
  static search(query: string): object[] {
    if (!query || query.length < 2) return [];

    const lower = query.toLowerCase();
    const results: object[] = [];

    DataProvider.getAllVerses().forEach((surah) => {
      surah.verses.forEach((verse) => {
        const inTranslation = verse.translation?.toLowerCase().includes(lower);
        const inArabic = verse.text?.includes(query);

        if (inTranslation || inArabic) {
          results.push({
            surahId: surah.id,
            surahName: surah.name,
            transliteration: surah.transliteration,
            verseNumber: verse.id,
            text: verse.text,
            translation: verse.translation,
          });
        }
      });
    });

    // Limit to 50 results to prevent large payloads
    return results.slice(0, 50);
  }
}
