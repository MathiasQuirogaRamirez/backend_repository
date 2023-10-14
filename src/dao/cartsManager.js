import { cartsModel } from "./models/carts.model.js";
import SuperManager from "./superManager.js";

class CartsManager extends SuperManager {
  constructor() {
    super(cartsModel);
  }
}

export const cartsManager = new cartsManager();