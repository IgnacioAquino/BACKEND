import fs from "fs"; 
import ProductManager from '../productManager.js'

const productManager = new ProductManager();
const path = "./cart.json"

class Carrito {

    getCarts = async () => {
        if (fs.existsSync(path)) {
            const data = await fs.promises.readFile(path, 'utf-8');
            const products = JSON.parse(data);
            return products
        } else {
            return []
        }
    }

    getCartsById = async (id) => {
        const arrayCarritos = await this.getCarts();
        return arrayCarritos.filter(item => item.id == id);
    }


newCart = async () => {
    const id = productManager.generateUniqueId();
    const carts = await this.getCarts()
    const newCarrito = {
        id,
        products : []
    };
    carts.push(newCarrito)
    try{
        await fs.promises.writeFile(path,JSON.stringify(carts));
        return newCarrito
    } catch (err){
        console.log(err)
    }
}

};

export default new Carrito();
