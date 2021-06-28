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
