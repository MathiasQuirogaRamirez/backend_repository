  import { Router } from "express";
  import { cartManager } from "../CartManager.js";
  
  const cartsRouter = Router ();
  
    /*** Carts  ***/
    cartsRouter.post("/", async (request, response) => {
      try {
        const cart = await cartManager.addCart(request.body);
  
        if (!cart) {
          response.status(400).json({ message: "Data not found" });
        } else {
          response.status(200).json({ message: 'Cart created', cart });
        }
      } catch (error) {
        response.status(500).json({ message: error });
      }
    });
    
    cartsRouter.get("/:id", async (request, response) => {
      const { id } = request.params;
      try {
        const products = await cartManager.getProducts(parseInt(id));
        if (!products) {
          response.status(400).json({ message: "Not find" });
        } else {
          response.status(200).json({ message: `Products of cart: ${id}`, products });
        }
      } catch (error) {
        response.status(500).json({ message: error })
      }
    });
  
    cartsRouter.post("/:idCart/product/:idProduct", async (request, response) => {
      try {
        const { idCart, idProduct } = request.params; 
        const cart = await cartManager.addProductToCart(parseInt(idCart), parseInt(idProduct));
        console.log("response: " + cart);
  
        if (!cart) {
          response.status(400).json({ message: "Data not found" });
        } else {
          response.status(200).json({ message: 'Updated cart', cart });
        }
      } catch (error) {
        response.status(500).json({ message: error });
      }
    });
  
    export { cartsRouter };