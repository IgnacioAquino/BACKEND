import products from "../products/controller.products.js" ;
import carts from "../carts/controller.carts.js" ;
import foods from "../user/controller.foods.js";
import realTimeProducts from "../realTimeProducts/controller.realTimeProducts.js"

const router = (app) => {
    app.use("/products", products)
    app.use("/carts", carts)
    app.use("/foods", foods)
    app.use("/realtimeproducts", realTimeProducts)
}


export default router;