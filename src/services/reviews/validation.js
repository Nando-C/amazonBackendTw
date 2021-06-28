import { body } from "express-validator";

export const reviewValidation = [
  body("comment")
    .exists()
    .withMessage("comment is a mandatory field!")
    .isLength({ min: 10 })
    .withMessage("comment has to be at least 10 chars"),
  body("rate")
    .exists()
    .withMessage("rate is a mandatory field!")
    .isInt({ min: 1, max: 10 })
    .withMessage("The rate has to be numeric between 1 and 10!"),
];

export const editReviewValidation = [
  body("comment")
    .exists()
    .withMessage("comment is a mandatory field!")
    .isLength({ min: 15 })
    .withMessage(
      "If you're editing a comment it has to be longer than it used to be"
    ),
  body("rate")
    .exists()
    .withMessage("rate is a mandatory field!")
    .isInt({ min: 1, max: 10 })
    .withMessage("The rate has to be numeric between 1 and 10!"),
];
