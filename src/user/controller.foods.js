import { Router } from 'express'

const router = Router()

const foods = [
{
    name : "burger",
    price : "10"
},
{
    name : "pizza",
    price : "20"
},
{
    name : "pancho",
    price : "30"
}]

router.get("/", (req,res)=>{
    const user = 
        {
            name : "nacho",
            country : "arg",
            role : "user"
        }
        
    res.render('index.handlebars', { 
        user : user,
        isAdmin: user.role === 'admin',
        foods
    })
});

export default router;