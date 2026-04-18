import { Request, Response } from "express";
import SurahModel from "../models/surah.model";

// ============================= Get all surahs  =============================
const getSurahs = (req: Request, res: Response) => {
    const data = SurahModel.getAllSurahs();
    return res.json(data);
};

// ============================= Get single surah by ID =============================
 const getSurahById = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const surah = SurahModel.getSurahById(id);

    if (!surah) {
        return res.status(404).json({ error: "Surah not found" });
    }

    return res.json(surah);
};

// ============================= Search ayahs by translation =============================
const searchAyahs = (req: Request, res: Response) => {
    const q = String(req.query.q || "").toLowerCase();

    if (!q) {
        return res.status(400).json({ error: "Query required" });
    }

    const data = SurahModel.getAll();
    const results: any[] = [];

    data.forEach((surah) => {
        surah.ayahs.forEach((ayah) => {
            if (ayah.translation.toLowerCase().includes(q)) {
                results.push({
                    surahNumber: surah.number,
                    surahName: surah.name,
                    englishName: surah.englishName,
                    ayahNumberInSurah: ayah.numberInSurah,
                    text: ayah.text,
                    translation: ayah.translation
                });
            }
        });
    });

    return res.json(results);
};


// export 

export const SurahController={
    getSurahById,
    getSurahs,
    searchAyahs
}