import { Router } from "express";
import { SurahController } from "../controllers/surah.controller";

const router = Router();
// ================================= Surah All routes===================================
router.get("/surahs", SurahController.getSurahs);
router.get("/surahs/:id", SurahController.getSurahById);
router.get("/search", SurahController.searchAyahs);

export const surahRoutes= router;