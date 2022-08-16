const express = require("express");
const router = express.Router();
const { requireUser, requireAdmin } = require("./utils")
// const { getAllProducts } = require("../db/models/products")
const { Products } = require("../db/DB_cyborg flying.js")

router.get("/", async (req, res, next) => {
    try {
        const allProducts = await getAllProducts();
        res.send(allProducts)
    } catch (error) {
        next(error)
    }
});

router.get("/:productId", async(req, res, next) => {
    const { productId } = req.params;
    try {
        const product = await getProductById(productId);
        if (!product) {
            res.send({
                error: "ProductDoesNotExistError",
                message: "Product does not exist",
            })
        }
        res.send(product)
    } catch (error) {
        next(error)
    }
})

router.delete("/:productId", requireAdmin, async(req, res, next) => {
    const { productId } = req.params;

    try {
        const deleted = await deleteProduct(productId);
        res.send(deleted)
    } catch (error) {
        next(error)
    }
})

router.post("/", requireAdmin, async(req, res, next) => {
    const { name, price, description, image } = req.body;

    try {
        const product = await createProduct({
            name,
            price, 
            description,
            image
        })
        res.send(product)
    } catch (error) {
        next(error)
    }
})

router.patch("/:productId", requireAdmin, async(req, res, next) => {
    const { name, price, description, image } = req.body;
    const { productId } = req.params;

    try {
        const product = await updateProduct({
            name,
            price,
            description,
            image
        })
        res.send(product);
    } catch (error) {
        next(error)
    }
})



module.exports = router;