const express = require("express");
const router = express.Router();
const { requireUser } = require("./utils")

router.post("/", async (req, res, next) => {
    try {
        // const allProducts = await getAllProducts();
        res.send('hi is this working?')
    } catch (error) {
        next(error)
    }
});

module.exports = router;