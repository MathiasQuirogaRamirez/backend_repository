import express from "express";
import {engine} from 'express-handlebars';
import { __dirname } from "./utils.js";
import { Server, Socket } from "socket.io";
import { productsRouter } from './router/products.router.js';
import { cartsRouter } from './router/carts.router.js';

import { productManager } from "./ProductManager.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//Configuration express-handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + "/views");

// routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

const httpServer  =  app.listen(8080, () => {
    console.log("Listening port:8080");
});

// websocket - server
const socketServer = new Server(httpServer);

let listProducts = [];

async function getProducts (socket, id, product) {
  const products = await productManager.getProducts();
  const list = products
    .map((product) => `<p>Title: ${product.title} - Description: ${product.description}</p>`)
    .join(" ");
  if (product)
    list.push(product);  
  socket.emit(id,  JSON.stringify(list));
}

socketServer.on("connection", (socket) => {
   console.log(`Cliente conectado ${socket.id}`);
   socket.on("disconnect", () => {
     console.log(`Cliente desconectado ${socket.id}`);
   });

   getProducts(socket, "getProducts");
   getProducts(socket, "getProductsRealTime");

   socketServer.on("addProduct", (product) => {
      getProducts(socket, "getProductsRealTime", product);
});

 });

app.get("/", (request, response) => {
  response.render("home");
});

app.get("/realtimeproducts", (request, response) => {
  response.render("realTimeProducts");
}); 