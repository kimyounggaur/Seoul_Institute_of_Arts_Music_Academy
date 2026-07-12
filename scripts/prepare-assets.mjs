import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceDir = path.resolve(process.cwd(), "..", "01 Source");
const imageDir = path.resolve(process.cwd(), "public", "images");
const audioDir = path.resolve(process.cwd(), "public", "audio");

await Promise.all([
  mkdir(imageDir, { recursive: true }),
  mkdir(audioDir, { recursive: true }),
]);

const images = [
  ["ChatGPT Image 2026년 7월 12일 오후 04_55_19.png", "hero-studio.webp", 1544, 78],
  ["ChatGPT Image 2026년 7월 12일 오후 04_54_41.png", "gallery-electric-guitar.webp", 1200, 74],
  ["ChatGPT Image 2026년 7월 12일 오후 04_55_08.png", "gallery-acoustic-guitar.webp", 1200, 74],
  ["ChatGPT Image 2026년 7월 12일 오후 04_55_16.png", "gallery-band-room.webp", 1200, 74],
  ["ChatGPT Image 2026년 7월 12일 오후 04_55_22.png", "gallery-upright-piano.webp", 1200, 74],
  ["ChatGPT Image 2026년 7월 12일 오후 04_55_25.png", "gallery-piano-practice.webp", 1200, 74],
  ["ChatGPT Image 2026년 7월 12일 오후 04_55_28.png", "gallery-grand-piano.webp", 1200, 74],
  ["ChatGPT Image 2026년 7월 12일 오후 04_55_35.png", "gallery-drum-studio.webp", 1200, 74],
  ["ChatGPT Image 2026년 7월 12일 오후 04_55_39.png", "gallery-acoustic-drums.webp", 1200, 74],
  ["ChatGPT Image 2026년 7월 12일 오후 04_55_43.png", "gallery-electronic-drums.webp", 1200, 74],
  ["ChatGPT Image 2026년 7월 12일 오후 04_55_49.png", "gallery-keyboard.webp", 1200, 74],
  ["ChatGPT Image 2026년 7월 12일 오후 04_55_52.png", "gallery-ensemble.webp", 1200, 74],
];

for (const [source, target, width, quality] of images) {
  await sharp(path.join(sourceDir, source))
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 5 })
    .toFile(path.join(imageDir, target));
}

const audioFiles = [
  ["서울~예대~실용음악학원 홍보송 1st.mp3", "academy-song-01.mp3"],
  ["서울~예대~실용음악학원 홍보송 2nd.mp3", "academy-song-02.mp3"],
  ["서울~예대~실용음악학원 홍보송 3rd.mp3", "academy-song-03.mp3"],
  ["서울~예대~실용음악학원 홍보송 4th.mp3", "academy-song-04.mp3"],
];

await Promise.all(
  audioFiles.map(([source, target]) =>
    copyFile(path.join(sourceDir, source), path.join(audioDir, target)),
  ),
);

console.log(`Prepared ${images.length} images and ${audioFiles.length} audio files.`);
