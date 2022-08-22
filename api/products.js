const express = require("express");
const router = express.Router();
const { Products, Role } = require("../db/DB_cyborg flying.js");
const { requireUser } = require("./utils")

router.get("/", async (req, res, next) => {
    try {
        const allProducts = await Products.getAllProducts();
        res.send(allProducts)
    } catch (error) {
        next(error)
    }
});

router.get("/:productId", async(req, res, next) => {
    const { productId } = req.params;
    try {
        const product = await Products.getProductById(productId);
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

router.delete("/:productId", requireUser, async(req, res, next) => {
    const { productId } = req.params;
    const user = req.user
        try {
            const role = await Role.getRoleById(user.roleId)
            if (role.name === 'admin') {
                const deleted = await Products.deleteProduct(productId);
                res.send(`${deleted.name} deleted from database`)
            } else {
                res.send('User must be an admin to perform this function')
            }
        } catch (error) {
            next(error)
        }
})

router.post("/", requireUser, async(req, res, next) => {
    const { name, price, description, image } = req.body;
    const user = req.user
    try {
        const role = await Role.getRoleById(user.roleId)
        if (role.name === 'admin') {
            const product = await Products.createProduct({
                name,
                price, 
                description,
                image
            })
            res.send(product)
        } else {
            res.send('User must be an admin to perform this function')
        }
    } catch (error) {
        next(error)
    }
})

router.patch("/:productId", requireUser, async(req, res, next) => {
    const { name, price, description, image } = req.body;
    const { productId } = req.params;
    const user = req.user
    try {
        const role = await Role.getRoleById(user.roleId)
        if (role.name === 'admin') {
            const product = await Products.updateProduct({
                id: productId,
                name,
                price,
                description,
                image
            })
            res.send(product);
        } else {
            res.send('User must be an admin to perform this function')
        }
    } catch (error) {
        next(error)
    }
})



module.exports = router;