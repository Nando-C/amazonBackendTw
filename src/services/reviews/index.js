/* ALL ROUTES STARTS WITH /REVIEW/ */

import express from "express"; // 3rd party package
import uniqid from "uniqid"; // 3rd party package
import {
  getReviews,
  writeReviews,
  writeReviewsPicture,
} from "../../lib/fs-tools.js";
import { validationResult } from "express-validator";
import { reviewValidation } from "./validation.js";

const reviewsRouter = express.Router();

/* GET ALL THE REVIEWS */
reviewsRouter.get("/", async (req, res, next) => {
  try {
    const reviews = await getReviews();
    res.send(reviews);
  } catch (error) {
    next(error);
  }
});

/* GET REVIEWS FOR PARTICULAR PRODUCT */
reviewsRouter.get("/get/:productId", async (req, res, next) => {
  try {
    const reviews = await getReviews();
    const filteredReviews = reviews.filter(
      (review) => review.productId === req.params.productId
    );
    res.status(200).send(filteredReviews);
  } catch (error) {
    next(error);
  }
});

/* GET PARTICULAR REVIEW */
reviewsRouter.get("/get/one-review/:reviewId", async (req, res, next) => {
  try {
    const reviews = await getReviews();
    const singleReview = reviews.filter(
      (review) => review._id === req.params.reviewId
    );
    res.status(200).send(singleReview);
  } catch (error) {
    next(error);
  }
});

/* POST REVIEW */
reviewsRouter.post(
  "/post/:productId",
  reviewValidation,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        const reviews = await getReviews();
        const newReview = {
          ...req.body,
          productId: req.params.productId,
          _id: uniqid(),
          createdAt: new Date(),
        };
        reviews.push(newReview);
        writeReviews(reviews);
        res.status(201).send({ _id: newReview._id });
      } else {
        // I HAD VALIDATION ERRORS
        next(createError(400, { errorsList: errors }));
      }
    } catch (error) {
      next(error);
    }
  }
);

/* UPDATE COMMENT */
reviewsRouter.put(
  "/put/:reviewId",
  reviewValidation,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        const reviews = await getReviews();
        const remainingReviews = reviews.filter(
          (review) => review._id !== req.params.reviewId
        );
        const foundReview = reviews.find(
          (review) => review._id === req.params.reviewId
        );
        const updatedReview = {
          ...foundReview,
          ...req.body,
          _id: req.params.reviewId,
        };
        remainingReviews.push(updatedReview);
        writeReviews(remainingReviews);
        res.status(200).send(updatedReview);
      } else {
        // I HAD VALIDATION ERRORS
        next(createError(400, { errorsList: errors }));
      }
    } catch (error) {
      next(error);
    }
  }
);

/* DELETE REVIEW */
reviewsRouter.delete("/delete/:reviewId", async (req, res, next) => {
  try {
    const reviews = await getReviews();
    const remainingReviews = reviews.filter(
      (review) => review._id !== req.params.reviewId
    );
    writeReviews(remainingReviews);
    res.status(200).send(`review with ${req.params.reviewId} has been deleted`);
  } catch (error) {
    next(error);
  }
});

export default reviewsRouter;
