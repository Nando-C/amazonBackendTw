import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const { readJSON, writeJSON, writeFile } = fs;
export const getCurrentFolderPath = (currentFile) =>
  dirname(fileURLToPath(currentFile));

/* ---- REVIEWS ---- */
const reviewsJSONpath = join(
  dirname(fileURLToPath(import.meta.url)),
  '../data/reviews.json'
);
const reviewsPublicFolderPath = join(
  dirname(fileURLToPath(import.meta.url)),
  '../../public/img/reviews'
);
export const getReviews = () => readJSON(reviewsJSONpath);
export const writeReviews = (content) => writeJSON(reviewsJSONpath, content);
export const writeReviewsPicture = (fileName, content) =>
  writeFile(join(reviewsPublicFolderPath, fileName), content);

/* ---- Products ---- */
const productsJSONpath = join(
  dirname(fileURLToPath(import.meta.url)),
  '../data/products.json'
);
const productsPublicFolderPath = join(
  dirname(fileURLToPath(import.meta.url)),
  '../../public/img/products'
);
export const getProducts = () => readJSON(productsJSONpath);
export const writeProducts = (content) => writeJSON(productsJSONpath, content);
export const writeProductsPicture = (fileName, content) =>
  writeFile(join(productsPublicFolderPath, fileName), content);

//files

export const writeUsersPicture = (fileName, content) =>
  writeFile(join(productsPublicFolderPath, fileName), content);
