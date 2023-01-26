import { Router } from 'express';
import ProductManager from '../productManager.js'

const productManager = new ProductManager();
const router = Router();


// GET

router.get("/", (req,res)=>{
    const productos = productManager.getProducts();
    const user = 
        {
            name : "nacho",
            country : "arg",
            role : "admin"
        }
        
    res.render('index.handlebars', { 
        user : user,
        isAdmin: user.role === 'admin',
        productos
    })
});


/*router.get("/", (req,res)=>{
    const limit = req.query.limit;
    const lastProducts = productManager.getProducts().slice(-limit);
    res.json(lastProducts);
});*/


router.get("/:pId", (req,res)=>{
    let pId = req.params.pId;
    let arrayProductos = productManager.getProducts();
    let product = arrayProductos.find(p => p.id === pId);
    
    if(!product){
        return res.send({error: "Producto no encontrado."})
    }
    res.send({product})
});


// POST

router.post("/", (req,res)=>{
    const { producto, descripcion, stock, id } = req.body
    let arrayProductos = productManager.getProducts();
    arrayProductos.push({ producto, descripcion, stock, id })
    res.status(201).json({message: "producto agregado"});
});

// PUT

router.put("/:id", (req,res) =>{
    let products = productManager.getProducts();
    const { id } = req.params
    const infoProd = req.body
    const prodPos = products.findIndex(product => product.id === id)
    const prodId = products[prodPos].id
    products[prodPos] = {
        prodId,
        ...infoProd
    }
    res.json({ message: "producto actualizado" })

});

// DELETE

router.delete("/:id", (req,res) =>{
    let products = productManager.getProducts();
    const { id } = req.params
    const deleted = products.findIndex(product => product.id === id)

    if(deleted){
        products = products.splice(deleted, 1)
        res.json(deleted)
    }else{
        res.json({ message: "no se encontro producto" })
    }
})


export default router;