
import express from 'express';
import { addItem, updateItem,deleteItem,getItems} from '../Controllers/cart.controllers.js';

const cartRouter = express.Router()


cartRouter.post('/', addItem)
cartRouter.get('/', getItems)
cartRouter.patch('/:id', updateItem)
cartRouter.delete('/:id', deleteItem)

export default cartRouter