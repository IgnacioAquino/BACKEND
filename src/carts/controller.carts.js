import { Router } from 'express';

const router = Router();

router.post("/cart", (req,res) =>{
    res.json({message : "cart"})
})

export default router;