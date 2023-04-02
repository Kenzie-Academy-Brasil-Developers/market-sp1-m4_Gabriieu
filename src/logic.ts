import { Request, Response } from "express";
import { market } from "./db";
import { iProduct } from "./interfaces";

export const postProduct = (request: Request, response: Response): Response => {
  const productList: iProduct[] = request.body;

  const date = new Date().getTime()
  const dueDate = date + (365.25 * 24 * 60 * 60 * 1000)
  
  let id = 0;

  if (market.length > 0) {
    id = market[market.length - 1].id;
  }

  productList.map((product) => {
    id += 1;
    product = { ...product, id: id, expiration_date: new Date(dueDate) };
    market.push(product);
  });

  return response.status(201).json(productList);
};

export const getAllProducts = (
  request: Request,
  response: Response
): Response => {
  return response.status(200).json(market);
};

export const getProductByID = (
  request: Request,
  response: Response
): Response => {
  const index = response.locals.product.product_index;

  return response.status(200).json(market[index]);
};

export const deleteProduct = (
  request: Request,
  response: Response
): Response => {
  const index = response.locals.product.product_index;

  market.splice(index, 1);

  return response.status(204).send();
};

export const updateProduct = (request: Request, response: Response): Response => {

  const product: iProduct = market[response.locals.product.product_index]
  const newData = request.body

  const updatedProduct: iProduct = {
    ...product,
    ...newData
  }

  market[response.locals.product.product_index] = updatedProduct

  return response.status(200).json(updatedProduct)
}