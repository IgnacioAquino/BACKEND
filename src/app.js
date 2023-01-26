import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io';
import router from './router/index.js';
import __dirname from './utils.js'

const app = express()
const port = 8080;

app.use(express.json());

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+ '/views');
app.set('view engine', 'handlebars');
app.use(express.static (__dirname+ '/public'))

router(app)


const httpServer = app.listen(port, ()=> {
    console.log(`server running on ${port}`)
});

const socketServer = new Server(httpServer);

socketServer.on('connection', socket =>{
    console.log("Nuevo cliente conectado")
    const id = socket.id

    socket.emit('newProduct', product =>{
        socket.emit('addProduct', product)
    })
})