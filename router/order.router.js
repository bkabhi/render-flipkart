
import express from 'express';
import { addItem, updateItem,deleteItem,getItems} from '../Controllers/order.controllers.js';

const orderRouter = express.Router()


orderRouter.post('/', addItem)
orderRouter.get('/', getItems)
orderRouter.patch('/:id', updateItem)
orderRouter.delete('/:id', deleteItem)

export default orderRouter