const express = require("express");
const router = express.Router();
const { requireUser } = require("./utils")

router.get("/", requireUser, async (req, res, next) => {
    const user = req.user
    
    try {
        const order = await getCartOrderByUser(user.id)
        const cartItems = await getCartItemsByOrderId(order.id)
        
        res.send(cartItems)
    } catch (error) {
        next(error)
    }
});

router.post("/", requireUser, async (req, res, next) => {
    const { product_id } = req.body;
    try {
        const order = await getCartOrderByUser(req.user.id)
        const addCart = await addItemToCart({
            product_id,
            order_id: order.id
        })
    } catch (error) {
        next(error)
    }
})


module.exports = router;