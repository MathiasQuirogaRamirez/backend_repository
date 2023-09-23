import fs from "fs";

class CartManager {

    constructor (path) {
        this.path = path;
    }

    async getCarts () {
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

    async getProducts (id) {
        try {
            const carts = await this.getCarts();
            let products = undefined;
            carts.forEach(item => {
                if(item.id === id)
                    products = { ...item.products };
            });
            return products;
        } catch (error) {
            return error
        }
    }

    async addCart (obj) {
        try {
            const carts = await this.getCarts();
            const id = carts.length ? carts.length + 1 : 1;
            const cart = { id, ...obj };
            carts.push(cart);
            await fs.promises.writeFile(this.path, JSON.stringify(carts));
            return cart;
        } catch (error) {
            return error;
        }
    }

    async addProductToCart (idCart, idProduct) {
        let updated = undefined;
        try {
            let carts = await this.getCarts();
            carts.forEach(async item => {
                if(item.id === idCart) {
                    let products = [ ...item.products ];
                    const index = products.findIndex ((itemProduct) => itemProduct.id === idProduct);
                    if (index === -1) {
                        products.push({"id":idProduct, quantity:1});
                        item.products = [ ...products ];
                    }
                    else 
                        item.products[index].quantity += 1;
                    updated = { ...item };
                    await fs.promises.writeFile(this.path, JSON.stringify(carts));
                }
            });
        } catch (error) {
            return error;
        }
        return updated;
    }
}
export const cartManager = new CartManager("CartsAPI.json");
