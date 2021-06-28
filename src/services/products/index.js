import express from 'express';
import uniqid from 'uniqid';
import createError from 'http-errors';
import { validationResult } from 'express-validator';

// fs-tools
import {
  getProducts,
  writeProducts,
  writeProductsPicture,
} from '../../lib/fs-tools.js';
import { productValidation } from './validation.js';

const productsRouter = express.Router();

productsRouter.get('/', async (req, res, next) => {
  try {
    const products = await getProducts();

    res.send(products);
  } catch (error) {
    next(error); // if I use next(error) inside a route handler I'm going to pass the error to the ERROR MIDDLEWARES
  }
});

productsRouter.get('/:id', async (req, res, next) => {
  try {
    const products = await getProducts();
    const product = products.find((p) => p._id === req.params.id);

    if (product) {
      res.send(product);
    } else {
      next(createError(404, `product with id ${req.params.id} not found`));
    }
  } catch (error) {
    next(error); // if I use next(error) inside a route handler I'm going to pass the error to the ERROR MIDDLEWARES
  }
});

productsRouter.post('/', productValidation, async (req, res, next) => {
  //refactor to validation with ifelse  and validation middleware before req,res,next

  try {
    const errors = validationResult(req);
    console.log('validation errors ', errors);
    if (errors.isEmpty()) {
      const newProduct = { ...req.body, _id: uniqid(), createAt: new Date() };

      const products = await getProducts();

      products.push(newProduct);

      await writeProducts(products);
      res.status(201).send({ _id: newProduct._id });
    } else {
      console.log('error in validation', errors);
      next(createError(400, { errorsList: errors }));
    }
  } catch (error) {
    next(error);
  }
});

productsRouter.put('/:productId', async (req, res, next) => {
  try {
    const products = await getProducts();
    const remainingProducts = products.filter(
      (product) => product._id !== req.params.productId
    );
    const foundProduct = products.find(
      (product) => product._id === req.params.productId
    );

    const updatedProduct = {
      ...foundProduct,
      ...req.body,
      _id: req.params.productId,
    };

    console.log('updated!!!!!!!!!!!!!!!!!!!', updatedProduct);

    remainingProducts.push(updatedProduct);

    await writeProducts(remainingProducts);

    res.send(updatedProduct);
  } catch (error) {
    next(error);
  }
});

productsRouter.delete('/:id', async (req, res, next) => {
  try {
    const products = await getProducts();
    const remainingProducts = products.filter((p) => p._id !== req.params.id);
    await writeProducts(remainingProducts);
    res.status(200).send('Deleted!');
  } catch (error) {
    next(error);
  }
});

export default productsRouter;
