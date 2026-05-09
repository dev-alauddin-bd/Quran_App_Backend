import fs from 'fs';
import path from 'path';

// ---------------------------------------------------------------------------
// Interfaces – define the shape of our Quran data
// ---------------------------------------------------------------------------

export interface Ayah {
  id: number;
  text: string;
  translation: string;
}

export interface Surah {
  id: number;
  name: string;
  transliteration: string;
  revelationType: string;
  verses: Ayah[];
}

// ---------------------------------------------------------------------------
// DataProvider – loads JSON data files once at startup
// ---------------------------------------------------------------------------

export class DataProvider {
  private static quran: Surah[] = [];
  private static chapters: any[] = [];

  /** Call once at app startup to read the static JSON files into memory. */
  static load(dataDir: string): void {
    const quranPath = path.join(dataDir, 'quran_en.json');
    const chaptersPath = path.join(dataDir, 'chapters.json');

    if (fs.existsSync(quranPath)) {
      this.quran = JSON.parse(fs.readFileSync(quranPath, 'utf-8')) as Surah[];
      console.log(`✅ Loaded ${this.quran.length} surahs`);
    } else {
      console.warn('⚠️  quran_en.json not found in:', dataDir);
    }

    if (fs.existsSync(chaptersPath)) {
      this.chapters = JSON.parse(fs.readFileSync(chaptersPath, 'utf-8'));
      console.log(`✅ Loaded ${this.chapters.length} chapters`);
    } else {
      console.warn('⚠️  chapters.json not found in:', dataDir);
    }
  }

  /** Returns the chapters metadata array (used by GET /api/surahs). */
  static getSurahs(): any[] {
    return this.chapters;
  }

  /** Returns a Surah by 1-based numeric id (used by GET /api/surah/:id). */
  static getSurahById(id: number): Surah | undefined {
    return this.quran.find((s) => s.id === id);
  }

  /** Returns the full Quran array for search operations. */
  static getAllVerses(): Surah[] {
    return this.quran;
  }
}
