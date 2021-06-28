import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { readJSON, writeJSON, writeFile } = fs;
export const getCurrentFolderPath = (currentFile) =>
  dirname(fileURLToPath(currentFile));

/* ---- REVIEWS ---- */
const reviewsJSONpath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../data/reviews.json"
);
const reviewsPublicFolderPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../public/img/reviews"
);
export const getReviews = () => readJSON(reviewsJSONpath);
export const writeReviews = (content) => writeJSON(reviewsJSONpath, content);
export const writeReviewsPicture = (fileName, content) =>
  writeFile(join(reviewsPublicFolderPath, fileName), content);
