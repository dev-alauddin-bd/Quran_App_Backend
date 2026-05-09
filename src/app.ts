import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import surahRouter from './routes/surahRoutes.js';
import { DataProvider } from './models/quran.model.js';

// ES Module __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Application = express();
const PORT = process.env.PORT || 3001;
// Middleware
app.use(express.json());
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


// Routes (MVC)
app.use('/api', surahRouter);


// Root health check
app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Quran Mazid Backend Server is Live! 🚀');
});

// Go up one level from 'src' to find the 'data' folder
const dataDir = path.join(__dirname, '..', 'data');
DataProvider.load(dataDir);

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
  });
}

export default app;
