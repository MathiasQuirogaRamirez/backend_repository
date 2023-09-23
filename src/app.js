import express from "express";
import {engine} from 'express-handlebars';
import { productsRouter } from './router/products.router.js';
import { cartsRouter } from './router/carts.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configuration express-handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

  app.listen(8080, () => {
    console.log("Listening port:8080");
  });