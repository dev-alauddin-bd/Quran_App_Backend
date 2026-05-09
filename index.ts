import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, 'data');
const QURAN_FILE = path.join(DATA_DIR, 'quran_en.json');
const CHAPTERS_FILE = path.join(DATA_DIR, 'chapters.json');

let quranData: any[] = [];
let chaptersData: any[] = [];

// Load data on startup
try {
  if (fs.existsSync(QURAN_FILE)) {
    quranData = JSON.parse(fs.readFileSync(QURAN_FILE, 'utf-8'));
  }
  if (fs.existsSync(CHAPTERS_FILE)) {
    chaptersData = JSON.parse(fs.readFileSync(CHAPTERS_FILE, 'utf-8'));
  }
} catch (err) {
  console.error('Error loading data:', err);
}

// Endpoints
app.get('/', (req, res) => {
  res.send('Quran Mazid Backend Server is Live! 🚀');
});

app.get('/api/surahs', (req, res) => {
  res.json(chaptersData);
});

app.get('/api/surah/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const surah = quranData.find((s: any) => s.id === id);
  if (surah) {
    res.json(surah);
  } else {
    res.status(404).json({ error: 'Surah not found' });
  }
});

app.get('/api/search', (req, res) => {
  const query = req.query.q as string;
  if (!query || query.length < 2) {
    return res.json([]);
  }

  const results: any[] = [];
  const lowerQuery = query.toLowerCase();

  quranData.forEach((surah: any) => {
    surah.verses.forEach((verse: any) => {
      const inTranslation = verse.translation.toLowerCase().includes(lowerQuery);
      const inArabic = verse.text.includes(query);
      
      if (inTranslation || inArabic) {
        results.push({
          surahId: surah.id,
          surahName: surah.name,
          transliteration: surah.transliteration,
          verseNumber: verse.id,
          text: verse.text,
          translation: verse.translation
        });
      }
    });
  });

  res.json(results.slice(0, 50)); // Limit to 50 results
});

app.get('/health', (req, res) => {
  res.send('OK');
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
  });
}

export default app;
