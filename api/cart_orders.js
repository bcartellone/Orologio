const express = require("express");
const router = express.Router();
const { requireUser } = require("./utils")
const { Order } = require("../db/DB_cyborg flying.js")

router.patch("/", requireUser, async (req, res, next) => {
    try {
        const user = req.user
        const activeOrder = await Order.getActiveCartOrderByUserId(user.id)
        await Order.updateCartOrder({ orderStatus: false, userId: activeOrder.userId, id: activeOrder.id})
        const newOrder = await Order.createCartOrder({ orderStatus: true, userId: user.id})
        res.send(newOrder)
    } catch (error) {
        next(error)
    }
});

module.exports = router;