import { Router } from 'express';
import { io } from 'socket.io-client';
import ProductManager from '../productManager.js'

const productManager = new ProductManager();

const router = Router();
const socket = io()


router.get("/", (req,res) =>{
    const { producto, descripcion, stock, id } = req.body
    let arrayProductos = productManager.getProducts();
    socket.on('addProduct', product =>{
        arrayProductos.push({ producto, descripcion, stock, id })
        res.render('index.handlebars', { 
            user : user,
            isAdmin: user.role === 'admin',
            foods
        })
    })
})



router.post("/", (req,res) =>{
    const { producto, descripcion, stock, id } = req.body
    let arrayProductos = productManager.getProducts();
    socket.on('addProduct', product =>{
        arrayProductos.push({ producto, descripcion, stock, id })
        res.render('index.handlebars', { 
            user : user,
            isAdmin: user.role === 'admin',
            foods
        })
    })
})




/*router.post("/", (req,res)=>{
    const { producto, descripcion, stock, id } = req.body
    let arrayProductos = productManager.getProducts();
    arrayProductos.push({ producto, descripcion, stock, id })
    res.status(201).json({message: "producto agregado"});
});*/


export default router;