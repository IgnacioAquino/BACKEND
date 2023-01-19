import products from "../products/controller.products.js" ;
import carts from "../carts/controller.carts.js" ;

const routes = (app) => {
    app.use("/", products)
    app.use("/", carts)
}


export default routes;