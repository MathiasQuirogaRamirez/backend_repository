import { productsModel } from "../models/products.model.js";
import SuperManager from "./superManager.js";

class ProductsManager extends SuperManager {
  constructor() {
    super(productsModel);
  }
}

export const productsManager = new ProductsManager();