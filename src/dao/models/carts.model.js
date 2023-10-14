import { Schema, model } from "mongoose";
import { productsModel } from "./products.model";

const cartsSchema = new Schema({
  products: [productsModel],
});

export const cartsModel = model("Carts", cartsSchema);