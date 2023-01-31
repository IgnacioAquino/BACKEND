// CLASS PRODUCT

import  fs, {readFileSync}  from "fs";


const jsonFile = JSON.parse(readFileSync("./productos.json"));



export default class ProductManager {
  
  constructor() {
    this.products = jsonFile;
    this.ruta = "./productos.json"
    this.id = 1,
    this.createFile()
  }
  
  createFile = () => {
    if(!fs.existsSync(this.ruta)){
      fs.writeFileSync(this.ruta, `[]`)
    }
  }

  save = async (objeto) => {
    let data = await fs.promises.readFile(this.ruta, 'utf-8')
    let content = JSON.parse(data)
    if(content.length == 0){
      objeto.id = this.id
      content.push(objeto);
      await fs.promises.writeFile(this.ruta, JSON.stringify(content, null, "/t"))

    } else{
      this.id = content.length
      objeto.id = this.id;
      content.push(objeto)
      await fs.promises.writeFile(this.ruta, JSON.stringify(content, null, "/t"))
    }
  } 

  generateUniqueId() {
    let id = Math.random().toString(36).substr(2, 8);

    while (this.products.some((p) => p.id === id)) {
      id = Math.random().toString(36).substr(2, 8);
    }

    return id;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const id = generateUniqueId();

    this.products.push({
      id: id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    });
  }

  getProducts() {
    return this.products;
  }


  getProductById(id) {
    let product = this.products.find((p) => p.id === id);
    if (!product) {
      console.error("No se ha encontrado un producto con este id");
    }
    return product;
  }


  updateProduct(id, title, description, price, thumbnail, code, stock) {
    this.products.push({
      id: id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    });
  }

  deleteProduct(id) {
    this.products.splice(id, 1);
  }
}