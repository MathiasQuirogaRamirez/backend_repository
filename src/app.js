import express from "express";
import { productManager } from './ProductManager.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get ("/products", async (request, response) => {
    try {
      const products = await productManager.getProducts();
      if (!products.length) {
        response.status(200).json({ message: "No products found" });
      } else {
        response.status(200).json({ message: 'Products found', products });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  });

  app.get("/products/:id", async (request, response) => {
    const { id } = request.params;
    try {
      const product = await productManager.getProductbyId(parseInt(id));
      if (product === "Not find") {
        response.status(400).json({ message: product });
      } else {
        response.status(200).json({ message: 'Product found', product });
      }
    } catch (error) {
      res.status(500).json({ message: error })
    }
  });

  app.post("/products", async (request, response) => {
    try {
      const product = await productManager.addProduct(request.body);
      const { title, description, price, thumbnail, code, stock } = request.body;

      if (!title || !description || !price || !thumbnail || !code || !stock) {
        response.status(400).json({ message: product });
      } else {
        response.status(200).json({ message: 'Product created', product });
      }
    } catch (error) {
      response.status(500).json({ message: error })
    }
  });

  app.delete("/products/:id", async (request, response) => {
    const { id } = req.params;
    try {
      const delete_message = await productManager.deleteProduct(parseInt(id));
      if (delete_message === "Not find") {
        response.status(400).json({ message: delete_message });
      } else {
        response.status(200).json({ message: delete_message });
      }
    } catch (error) {
      res.status(500).json({ message: error })
    }
  });
  
  app.put("/products/:id", async (request, response) => {
    const { id } = request.params;
    try {
      const update_message = await productManager.updateProduct(request.body);
      if (update_message === "Not find") {
        response.status(400).json({ message: update_message });
      } else {
        response.status(200).json({ message: update_message });
      }
    } catch (error) {
      response.status(500).json({ message: error })
    }
  });
  
  app.listen(8080, () => {
    console.log("Listening port:8080");
  });