import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const { readJSON, writeJSON, writeFile } = fs;

const productsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  './products/products.json'
);

export const getProducts = () => readJSON(usersJSONPath);

export const writeProducts = (content) => writeJSON(usersJSONPath, content);

// export const getCurrentFolderPath = currentFile => dirname(fileURLToPath(currentFile))

// export const writeUsersPicture = (fileName, content) => writeFile(join(usersPublicFolderPath, fileName), content)
