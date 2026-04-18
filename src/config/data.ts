import fs from "fs";
import path from "path";

export interface Ayah {
    numberInSurah: number;
    text: string;
    translation: string;
}

export interface Surah {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    revelationType: string;
    ayahs: Ayah[];
}

let quranData: Surah[] = [];

try {
    const filePath = path.join(__dirname, "../../data.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    quranData = JSON.parse(rawData);
    console.log("Quran data loaded");
} catch (err) {
    console.error("Data load error:", err);
}

export default quranData;