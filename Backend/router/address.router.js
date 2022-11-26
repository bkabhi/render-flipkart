import express from 'express'
import postaddress from '../Controllers/address.controller.js';

const addressRouter = express.Router();
// productRouter.get('/', getProduct)
addressRouter.post('/create', postaddress)

export default addressRouter