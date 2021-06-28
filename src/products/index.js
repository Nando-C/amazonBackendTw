import express from 'express';
import uniqid from 'uniqid';
import createError from 'http-errors';
//validator import { validationResult } from "express-validator"

// fs-tools
import {
  getProducts,
  writeProducts,
  writeProductsPicture,
} from '../lib/fs-tools.js';

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

productsRouter.post('/', async (req, res, next) => {
  //refactor to validation with ifelse  and validation middleware before req,res,next

  try {
    const newProduct = { ...req.body, _id: uniqid(), createAt: new Date() };

    const products = await getProducts();

    products.push(newProduct);

    await writeProducts(products);
    res.status(201).send({ _id: newProduct._id });
  } catch (error) {
    next(error);
  }
});

productsRouter.put('/:id', async (res, req, next) => {
  try {
    const products = await getProducts();
    console.log(products);
    const remainingProducts = products.filter(
      (product) => product._id !== req.params.id
    );
    console.log(req.params.id);

    const updatedProduct = { ...req.body, _id: req.params.id };

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
