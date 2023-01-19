import express from 'express'
import routes from './routes/index.js';

const app = express()
const port = 8080;

app.use(express.json());

routes(app)

// SERVER

app.listen(port, ()=> {
    console.log(`server running on ${port}`)
});