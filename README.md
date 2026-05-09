# Quran Mazid Backend API

This is the backend API for the **Quran Mazid** web application. It serves Quranic text, transliteration, English translations, and provides search functionality over the entire Quran.

## Technologies Used
- **Node.js** & **Express**
- **TypeScript**
- **Vercel Serverless Functions** (for deployment)

## API Endpoints

### 1. Get All Surahs
- **Endpoint**: `/api/surahs`
- **Method**: `GET`
- **Description**: Returns a list of all 114 Surahs with their basic metadata (name, translation, number of ayahs, etc.).

### 2. Get Specific Surah
- **Endpoint**: `/api/surah/:id`
- **Method**: `GET`
- **Description**: Returns detailed information for a specific Surah by its ID (1-114), including all its verses, Arabic text, and English translations.

### 3. Search the Quran
- **Endpoint**: `/api/search?q={query}`
- **Method**: `GET`
- **Description**: Searches the entire Quran (both Arabic text and English translation) for the given query. Returns a list of matching verses.

### 4. Health Check
- **Endpoint**: `/health`
- **Method**: `GET`
- **Description**: Returns a simple `OK` to verify the server is running.

## Local Development

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run the development server:
   ```bash
   pnpm run dev
   ```

The server will start on `http://localhost:3001`.

## Deployment

This backend is fully configured to be deployed on **Vercel**.
Simply import the repository into Vercel and it will automatically use the `vercel.json` configuration to deploy the Express application as a Serverless Function.
