import { Router } from "express";
import fs, { read } from "fs";
import ProductManager from "../productManager.js";
import Carrito from "./classCart.js";

const productManager = new ProductManager();
const router = Router();
const path = "./cart.json";

router.post("/cart", (req, res) => {
  const newCart = {
    id: productManager.generateUniqueId(),
    items: req.body,
  };

  fs.exists("cart.json", (exists) => {
    if (exists) {
      fs.readFile("cart.json", "utf8", (err, data) => {
        let existingCart = JSON.parse(data);
        existingCart.push(newCart);
        let jsonArray = JSON.stringify(existingCart);
        fs.writeFile("cart.json", jsonArray, "utf8", (err) => {
          if (err) throw err;
          console.log("El archivo ha sido guardado!");
        });
        res.json(newCart);
      });
    } else {
      let json = JSON.stringify([newCart]);
      fs.writeFile("cart.json", json, "utf8", () => {
        console.log("El archivo ha sido guardado!");
      });
      res.json(newCart);
    }
  });
});

router.get("/cart", async (req, res) => {
  const arrayCarritos = await Carrito.getCarts();
  res.status(200).json(arrayCarritos);
});

router.get("/cart/:cId", async (req, res) => {
  const itemFinded = await Carrito.getCartsById(req.params.cId);

  if (itemFinded.length == 0) {
    return res
      .status(500)
      .json("ERROR: El carrito con el id (" + req.params.cId + ") no existe");
  } else {
    res.status(200).json(itemFinded);
  }
});


router.post("/cart/:cid/product/:pid", async (req, res) => {
    try {
      
      let data = JSON.parse(fs.readFileSync('cart.json'));
      let cart = data.find(cart => cart.id === req.params.cid);
      
      if (!cart) {
        cart = { id: req.params.cid, items: [] };
        data.push(cart);
      }
      let item = cart.items.find(item => item.id === req.params.pid);
      
      if (!item) {
        item = { id: req.params.pid, ...req.body };
        cart.items.push(item);
      } else {
        
        item.producto = req.body.producto;
        item.descripcion = req.body.descripcion;
        item.stock = parseInt(item.stock) + parseInt(req.body.stock);
      }
      
      fs.writeFileSync('cart.json', JSON.stringify(data));
      
      const updatedCart = await Carrito.getCartsById(req.params.cid);
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

export default router;
