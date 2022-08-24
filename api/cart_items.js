const express = require("express");
const router = express.Router();
const { Order, Item, Products } = require("../db/DB_cyborg flying.js")

router.get("/", async (req, res, next) => {
    const user = req.user
    if (!user) {
        const { cart } = req.session;
        if (!cart) {
            res.send("No items in cart")
        } else {
            const sessionCart = []
            await Promise.all(cart.items.map(async (eachItem, index) => {
                const eachProduct = await Products.getProductById(eachItem.productId)
                sessionCart.push({itemId: index, product: eachProduct, quantity: eachItem.quantity})
            }))
            res.send(sessionCart)
        }
    } else {
        try {
            const order = await Order.getActiveCartOrderByUserId(user.id)
            const cartItems = await Item.getCartItemsByOrderId(order.id)
            const newCart = []
            await Promise.all(cartItems.map(async (eachItem) => {
                const eachProduct = await Products.getProductById(eachItem.productId)
                newCart.push({itemId: eachItem.id, product: eachProduct, orderId: eachItem.orderId, quantity: eachItem.quantity})
            }))
            res.send(newCart)
        } catch (error) {
            next(error)
        }
    }
});

router.post("/", async (req, res, next) => {
    const user = req.user;
    if (!user) {
        const { productId, quantity } = req.body;
        const cartItem = { productId, quantity}
        const { cart } = req.session

        if (cart) {
            const { items } = cart;
            items.push(cartItem)
        } else {
            req.session.cart = {
                items: [cartItem]
            }
        };
        res.send(`productId: ${productId} successfully added to cart`)
    } else {
        const { productId, quantity } = req.body;
        try {
            const order = await Order.getActiveCartOrderByUserId(req.user.id)
            const addedItem = await Item.createCartItem({
                productId,
                orderId: order.id,
                quantity
            })
            res.send(`productId: ${addedItem.productId} successfully added to cart`)
        } catch (error) {
            next(error)
        }
    }
})

router.delete("/:itemId", async (req, res, next) => {
    const { itemId } = req.params
    const user = req.user
    if (!user) {
        const allItems = req.session.cart.items
        allItems.splice(itemId, 1)
        res.send(200)
    } else {
        try {
            const deletedItem = await Item.deleteCartItem(itemId);
            const deletedProduct = await Products.getProductById(deletedItem.productId)
            res.send(`${deletedProduct.name} successfully deleted from cart`)
        } catch (error) {
            next(error)
        }
    }
})

router.patch("/:itemId", async (req, res, next) => {
    const { itemId } = req.params;
    const { productId, orderId, quantity } = req.body
    const user = req.user
    if (!user) {
        const allItems = req.session.cart.items
        allItems[itemId].productId = productId
        allItems[itemId].quantity = quantity
        res.send(200)
    } else {
        try {
            const updatedItem = await Item.updateCartItemsById({id: itemId, productId, orderId, quantity});
            
            res.send('Item successfully updated')
        } catch (error) {
            next(error)
        }
    }
})
module.exports = router;