import { Router } from "express";
import { productsManager } from "../dao/productsManager.js";

const productsRouter = Router ();

/*** Products  ***/

productsRouter.get ("/", async (request, response) => {
    try {
      let products = await productsManager.findAll();
      /*const { limit } = request.query;
      
      if (limit) 
        products = products.slice(0, limit);*/

      if (!products.length) {
        response.status(200).json({ message: "No products found" });
      } else {
        response.status(200).json({ message: 'Products found', products });
      }
    } catch (error) {
      response.status(500).json({ message: error });
    }
  });

  productsRouter.get("/:id", async (request, response) => {
    const { id } = request.params;
    try {
      const product = await productsManager.findById(id);
      /*if (product_response === "Not find") {
        response.status(400).json({ message: product_response });
      } else {
        response.status(200).json({ message: 'Product found', product_response });
      }*/
      response.status(200).json({ message: "Product", product });
    } catch (error) {
      response.status(500).json({ message: error })
    }
  });

  productsRouter.post("/", async (request, response) => {
    
    try {
      const product = await productsManager.createOne(request.body);

      /*if (!product) {
        response.status(400).json({ message: "Data not found" });
      } else {
        response.status(200).json({ message: 'Product created', product });
      }*/

      response.status(200).json({ message: 'Product created', product });
    } catch (error) {
      response.status(500).json({ message: error });
    }
  });

  productsRouter.delete("/:id", async (request, response) => {
    const { id } = request.params;
    try {
      const user = await productsManager.deleteOne(id);
      /*if (delete_message === "Not find") {
        response.status(400).json({ message: delete_message });
      } else {
        response.status(200).json({ message: delete_message });
      }*/
      response.status(200).json({ message: 'Deleted', user });
    } catch (error) {
      response.status(500).json({ message: error })
    }
  });
  
  productsRouter.put("/:id", async (request, response) => {
    const { id } = request.params;
    try {
      const product = await productsManager.updateOne(id, request.body);
      /*if (update_message === "Not find") {
        response.status(400).json({ message: update_message });
      } else {
        response.status(200).json({ message: update_message });
      }*/
      response.status(200).json({ message: 'Updated', product });
    } catch (error) {
      response.status(500).json({ message: error })
    }
  });

  //export { productsRouter };
  export default productsRouter;