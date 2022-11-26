import express from "express";
import cors from "cors";
import userRouter from "./router/auth.router.js";
import connection from "./config/db.js";
import cartRouter from "./router/cart.router.js";
import orderRouter from "./router/order.router.js";
import productRouter from "./router/products.router.js";
import logger from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorhandler.js";
import { assignAuth } from "./middleware/assignAuth.js";
import addressRouter from './router/address.router.js'

const Port = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cors());
app.use(assignAuth)
app.use(logger)


app.use('/auth', userRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);
app.use('/products', productRouter)
app.use('/address',addressRouter)


app.use(errorHandler); // default errorHandler



app.listen(Port, () => {
  connection();
  console.log(`server is running at http://localhost:${Port}`);
});
 