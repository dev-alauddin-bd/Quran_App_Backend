import express, { type Application, Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// -----------------------------------------------------------------------------
// Initialization & Configuration
// -----------------------------------------------------------------------------

// ES Module setup for __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express Application
const app: Application = express();
const PORT = process.env.PORT || 3001;

// -----------------------------------------------------------------------------
// Middleware Setup
// -----------------------------------------------------------------------------

// Configure CORS for specific frontend origins and methods
// This allows secure communication between the frontend and this backend API
app.use(
  cors({
    origin: [
      'https://quran-app-frontend-five.vercel.app',
      'http://localhost:3000',
      'http://localhost:3001',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Parse incoming JSON payloads
app.use(express.json());

// -----------------------------------------------------------------------------
// Data Loading
// -----------------------------------------------------------------------------

const DATA_DIR = path.join(__dirname, 'data');
const QURAN_FILE = path.join(DATA_DIR, 'quran_en.json');
const CHAPTERS_FILE = path.join(DATA_DIR, 'chapters.json');

// In-memory data stores for fast API responses
let quranData: any[] = [];
let chaptersData: any[] = [];

// Load static JSON data synchronously on startup
// This ensures data is ready before serving any requests
try {
  if (fs.existsSync(QURAN_FILE)) {
    quranData = JSON.parse(fs.readFileSync(QURAN_FILE, 'utf-8'));
    console.log(`✅ Loaded ${quranData.length} Surahs from quran_en.json`);
  } else {
    console.warn('⚠️ quran_en.json not found in data directory.');
  }

  if (fs.existsSync(CHAPTERS_FILE)) {
    chaptersData = JSON.parse(fs.readFileSync(CHAPTERS_FILE, 'utf-8'));
    console.log(`✅ Loaded ${chaptersData.length} chapters from chapters.json`);
  } else {
    console.warn('⚠️ chapters.json not found in data directory.');
  }
} catch (err) {
  console.error('❌ Error loading initial data:', err);
}

// -----------------------------------------------------------------------------
// API Endpoints
// -----------------------------------------------------------------------------

/**
 * @route GET /
 * @desc Root route to verify server is live.
 */
app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Quran Mazid Backend Server is Live! 🚀');
});

/**
 * @route GET /api/surahs
 * @desc Fetches the metadata for all 114 Surahs.
 */
app.get('/api/surahs', (req: Request, res: Response) => {
  res.status(200).json(chaptersData);
});

/**
 * @route GET /api/surah/:id
 * @desc Fetches a specific Surah by its ID, including all its Ayahs (verses) and translations.
 */
app.get('/api/surah/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const surah = quranData.find((s: any) => s.id === id);

  if (surah) {
    res.status(200).json(surah);
  } else {
    res.status(404).json({ error: 'Surah not found' });
  }
});

/**
 * @route GET /api/search
 * @desc Searches the entire Quran (Arabic text and English translation).
 * @query q: The search keyword (minimum 2 characters).
 */
app.get('/api/search', (req: Request, res: Response) => {
  const query = req.query.q as string;

  // Return empty array if query is too short
  if (!query || query.length < 2) {
    return res.status(200).json([]);
  }

  const results: any[] = [];
  const lowerQuery = query.toLowerCase();

  // Iterate through all Surahs and their verses to find matches
  quranData.forEach((surah: any) => {
    surah.verses.forEach((verse: any) => {
      const inTranslation = verse.translation?.toLowerCase().includes(lowerQuery);
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

  // Limit results to 50 to prevent massive payloads and improve performance
  res.status(200).json(results.slice(0, 50));
});

/**
 * @route GET /health
 * @desc Simple health check endpoint for monitoring tools.
 */
app.get('/health', (req: Request, res: Response) => {
  res.status(200).send('OK');
});

// -----------------------------------------------------------------------------
// Server Initialization
// -----------------------------------------------------------------------------

// Only start the server locally if not in a Vercel production environment.
// Vercel handles the server listening mechanism automatically when `app` is exported.
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
  });
}

// Export the Express application for Serverless deployments (like Vercel)
export default app;
