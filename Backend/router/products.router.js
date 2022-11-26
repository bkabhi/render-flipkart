import express from 'express'
import { getProduct, getProductById, postProduct } from '../Controllers/products.controller.js';

const productRouter = express.Router();
productRouter.get('/', getProduct)
productRouter.post('/create', postProduct)
productRouter.get('/:id', getProductById)

export default productRouter