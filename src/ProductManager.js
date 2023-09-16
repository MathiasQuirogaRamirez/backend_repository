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
            const validatioOne = title && description && price && url && code && stock;
            const validationTwo = !products.find ((event) => event.code === code);
            if (!validatioOne) {
                console.log("Error: Empty fields");
                return "Error: Empty fields";
            }
            else if (!validationTwo) {
                console.log("Error: The product already exist!");
                return "Error: The product already exist!";
            }
            return validatioOne && validationTwo;
        }
        const idd = products.length ? products.length + 1 : 1;
        const product = { idd, ...obj };
        /*const product = {
            id: products.length ? products.length + 1 : 1,
            title: obj.title,
            description: obj.description,
            price: obj.price,
            thumbnail: obj.thumbnail,
            code: obj.code,
            stock: obj.stock
        };*/

        if (validateCode(products)) {
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return "Product added";
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
            const product = this.found(id, products);
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
            console.log("pid: " + product.id);
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

async function test (){
    const pm = new ProductManager("Products.json");
    console.log(await pm.addProduct("title1", "description1", 20.99, "url1", "123456", 100));
    console.log(await pm.addProduct("title2", "description2", "url2", "123457", 200));
    console.log(await pm.addProduct("title3", "description3", 20.99, "url3", "123458", 90));
    console.log(await pm.addProduct("title4", "description4", 20.99, "url4", "123458", 90));
    console.log(await pm.addProduct("title5", "description5", 20.99, "url5", "123459", 25));
    console.log(await pm.getProductbyId(2));
    console.log(await pm.getProductbyId(5));
    console.log(await pm.deleteProduct(15));
    console.log(await pm.deleteProduct(2));
    console.log(await pm.updateProduct({id:1, title:"title1new", description:"description1", price:26.99, thumbnail:"url1", code:"123458", stock:90}))
}

//test ();

export const productManager = new ProductManager("ProductsAPI.json");
