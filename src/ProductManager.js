import fs from "fs";

class ProductManager {

    constructor (path) {
        this.path = path;
    }

    found = (id, products) => {
        return products.find ((event) => event.id === id);
    }

    async addProduct (obj) {

        const products = await this.getProducts();

        const validateCode = (products) => {
            const validatioOne = obj.title && obj.description && obj.price && obj.thumbnail && obj.code && obj.stock;
            const validationTwo = !products.find ((event) => event.code === obj.code);
            return validatioOne && validationTwo;
        }

        const id = products.length ? products.length + 1 : 1;
        const product = { id, ...obj };
        
        if (validateCode(products)) {
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return product;
        }
    }

    async getProducts () {
        try {
            if(fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path, "utf-8");
                return JSON.parse(data);
            } else {
                return [];
            }
        } catch (error) {
            return error
        }
    }

    async getProductbyId (id) {
        try {
            const products = await this.getProducts();
            const product = products.find ((event) => event.id === id);
            return product ? product : "Not find";
        } catch (error) {
            return error;
        }
    }

    async updateProduct (product) {
        try {
            let products = await this.getProducts();
            if (!this.found(product.id, products)) 
                return "Not find";
            await this.deleteProduct(product.id);
            products = await this.getProducts();
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return "Product updated correctly";
        } catch (error) {
            return error;
        }
    }

    async deleteProduct (id) {
        try {
            const products = await this.getProducts();
            if (!this.found(id, products)) 
                return "Not find";
            const new_products = products.filter(event => event.id !== id);
            await fs.promises.writeFile(this.path, JSON.stringify(new_products));
            return "Product " + id + " deleted";
        } catch (error) {
            return error;
        }
    }
}

export const productManager = new ProductManager("ProductsAPI.json");
