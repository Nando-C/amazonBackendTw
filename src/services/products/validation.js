import { body } from 'express-validator';

export const productValidation = [
  body('name').exists().withMessage('Name is mandatory field!'),
  body('description')
    .exists()
    .withMessage('Description is mandatory field!')
    .isLength({ min: 10 })
    .withMessage('More then 10!'),
  body('brand').exists().withMessage('Brand is mandatory field'),
  body('price')
    .exists()
    .withMessage('Price is required')
    .isInt()
    .withMessage('must be integer'),
  body('category').exists().withMessage('Category is mandatory field!'),
];
