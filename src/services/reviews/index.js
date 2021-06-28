import express from "express"; // 3rd party package
import uniqid from "uniqid"; // 3rd party package
import {
  getReviews,
  writeReviews,
  writeReviewsPicture,
} from "../../lib/fs-tools.js";

const reviewsRouter = express.Router();

reviewsRouter.get("/", async (req, res, next) => {
  try {
    const reviews = await getReviews();
    res.send(reviews);
  } catch (error) {
    next(error);
  }
});

export default reviewsRouter;
