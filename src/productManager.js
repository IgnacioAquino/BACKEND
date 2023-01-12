// CLASS PRODUCT

class ProductManager {
  constructor() {
    this.products = [
    {"producto": "1", "descripción": "1","stock": "100", "id": "1"},
    {"producto": "2", "descripción": "2","stock": "100", "id": "2"},
    {"producto": "3", "descripción": "3","stock": "100", "id": "3"},
    {"producto": "4", "descripción": "4","stock": "100", "id": "4"},
    {"producto": "5", "descripción": "5","stock": "100", "id": "5"},
    {"producto": "6", "descripción": "6","stock": "100", "id": "6"},
    {"producto": "7", "descripción": "7","stock": "100", "id": "7"},
    {"producto": "8", "descripción": "8","stock": "100", "id": "8"},
    {"producto": "9", "descripción": "9","stock": "100", "id": "9"},
    {"producto": "10", "descripción": "10","stock": "100", "id": "10"}]; 
  }

  generateUniqueId() {

      let id = Math.random().toString(36).substr(2, 8);

      while (this.products.some(p => p.id === id)) {
        
        id = Math.random().toString(36).substr(2, 8);
      }
  
     
      return id;
    }

  addProduct(title, description, price, thumbnail, code, stock) {
  
  const id = this.generateUniqueId();

    this.products.push({
      id: id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    });
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    let product = this.products.find(p => p.id === id);
    if (!product) {
      console.error('No se ha encontrado un producto con este id');
    }
    return product;
  }
  updateProduct(id,title, description, price, thumbnail, code, stock) {
   
      this.products.push({
          id: id,
          title,
          description,
          price,
          thumbnail,
          code,
          stock
        });
    }

    deleteProduct(id) {
      
      this.products.splice(id, 1);
}
}

let productManager = new ProductManager();

module.exports = ProductManager;