/**
 * Image pipeline: resize + compress source art into the webp files the site
 * ships, then derive the OG image and the apple-touch icon.
 *
 * Safe to re-run: any step whose source file is absent is skipped, so removing
 * bulky originals after a conversion does not break later runs.
 */
import sharp from "sharp";
import { existsSync, mkdirSync, readFileSync } from "node:fs";

const root = "C:/Users/Ddant/Desktop/projects/vocisXultra";
const images = `${root}/public/images`;

mkdirSync(`${images}/team`, { recursive: true });

const kb = (bytes) => Math.round(bytes / 1024) + "KB";

async function convert(src, out, transform) {
  if (!existsSync(src)) {
    console.log("skip (no source):", out);
    return null;
  }
  const info = await transform(sharp(src)).toFile(out);
  console.log(out.replace(`${root}/`, ""), `${info.width}x${info.height}`, kb(info.size));
  return info;
}

// Scene photography
const scenes = [
  ["hero.png", "hero.webp", 2560],
  ["rehearsal.png", "rehearsal.webp", 2016],
  ["score.png", "score.webp", 1600],
  ["conductor.png", "conductor.webp", 1536],
];
for (const [src, out, width] of scenes) {
  await convert(`${images}/${src}`, `${images}/${out}`, (s) =>
    s.resize({ width, withoutEnlargement: true }).webp({ quality: 84, effort: 6 }),
  );
}

// Portraits — management + ensemble members, 3:4, at 2x the largest render size
const portraits = [
  ["m1", "management-1"],
  ["m2", "management-2"],
  ["m3", "management-3"],
  ["m4", "management-4"],
  ["s1", "member-1"],
  ["s2", "member-2"],
  ["s3", "member-3"],
  ["s4", "member-4"],
  ["s5", "member-5"],
  ["s6", "member-6"],
  ["s7", "member-7"],
  ["s8", "member-8"],
];
for (const [src, out] of portraits) {
  await convert(`${images}/team-src/${src}.png`, `${images}/team/${out}.webp`, (s) =>
    s
      .resize({ width: 720, height: 960, fit: "cover", position: "top" })
      .webp({ quality: 82, effort: 6 }),
  );
}

// OG image (1200x630) — from whichever hero source exists
const heroSource = existsSync(`${images}/hero.png`)
  ? `${images}/hero.png`
  : `${images}/hero.webp`;
await convert(heroSource, `${root}/public/og.jpg`, (s) =>
  s.resize(1200, 630, { fit: "cover", position: "attention" }).jpeg({ quality: 85, mozjpeg: true }),
);

// Apple touch icon from the brand mark
const iconPath = `${root}/src/app/icon.svg`;
if (existsSync(iconPath)) {
  const info = await sharp(readFileSync(iconPath), { density: 300 })
    .resize(180, 180)
    .png()
    .toFile(`${root}/src/app/apple-icon.png`);
  console.log("src/app/apple-icon.png", `${info.width}x${info.height}`, kb(info.size));
}
