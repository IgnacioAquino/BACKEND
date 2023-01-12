const express = require ("express");
const ProductManager = require('./ProductManager')
const contenedor = new ProductManager("productos.json");
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const products = [
    {"producto": "1", "descripción": "1","stock": "100", "id": "1"},
    {"producto": "2", "descripción": "2","stock": "100", "id": "2"},
    {"producto": "3", "descripción": "3","stock": "100", "id": "3"},
    {"producto": "4", "descripción": "4","stock": "100", "id": "4"},
    {"producto": "5", "descripción": "5","stock": "100", "id": "5"},
    {"producto": "6", "descripción": "6","stock": "100", "id": "6"},
    {"producto": "7", "descripción": "7","stock": "100", "id": "7"},
    {"producto": "8", "descripción": "8","stock": "100", "id": "8"},
    {"producto": "9", "descripción": "9","stock": "100", "id": "9"},
    {"producto": "10", "descripción": "10","stock": "100", "id": "10"}
];

app.get("/", (req,res)=>{
    res.send("Bienvenidos")
});

app.get("/products", (req,res)=>{
    res.send(contenedor)
});

app.get("/products?limit=5", (req,res)=>{
    const limit = req.query.params.limit;
    let fiveProducts = products.slice(5, limit);
    res.json({fiveProducts});
});


app.get("/products/:pId", (req,res)=>{
    let pId = req.params.pId;
    let product = products.find(p => p.id === pId);
    
    if(!product){
        return res.send({error: "Producto no encontrado."})
    }
    
    res.send({product})
});

app.listen(8080, ()=> {
    console.log("server running on port 8080", 8080)
});
