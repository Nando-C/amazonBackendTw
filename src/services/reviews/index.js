import express from "express"; // 3rd party package
import fs from "fs"; // core package
import { fileURLToPath } from "url"; // core package
import { dirname, join } from "path"; // core package
import uniqid from "uniqid"; // 3rd party package

const reviewsRouter = express.Router();

export default reviewsRouter;
