import quranData, { Surah } from "../config/data";

// ======================================= Surah Model ======================================

const SurahModel = {
    getAllSurahs: (): Partial<Surah>[] => {
        return quranData.map((s) => ({
            number: s.number,
            name: s.name,
            englishName: s.englishName,
            englishNameTranslation: s.englishNameTranslation,
            revelationType: s.revelationType,
            numberOfAyahs: s.ayahs.length
        }));
    },

    getSurahById: (id: number): Surah | undefined => {
        return quranData.find((s) => s.number === id);
    },

    getAll: (): Surah[] => quranData
};

export default SurahModel;