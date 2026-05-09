import { Router } from 'express';
import { getAllSurahs, getSurah } from '../controller/surah.controller.js';
import { searchQuran } from '../controller/search.controller.js';

const router: Router = Router();

router.get('/surahs', getAllSurahs);
router.get('/surah/:id', getSurah);
router.get('/search', searchQuran);

export default router;
