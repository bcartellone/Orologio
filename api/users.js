const express = require("express");
const router = express.Router();
const { requireUser } = require("./utils");
const { User, Order, Item, Role } = require("../db/DB_cyborg flying.js")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { JWT_SECRET } = process.env;

router.post("/register", async (req, res, next) => {
    const { username, password, roleId } = req.body;
     
    try {
        const _user = await User.getUserByUsername(username);

        if (_user) {
            res.send({
                error: "UserExistsError",
                name: "UserExistsError",
                message: `User ${username} is already taken.`,
            })
        }
        else if (password.length < 8) {
            res.send({
                error: "PasswordTooShortError",
                message: "Password needs at least 8 characters",
                name: "PasswordTooShortError",
            })
        } else {
            if (roleId) {
                await User.createUser({
                        username, 
                        password,
                        roleId,
                    });
            } 
            if (!roleId) {
                await User.createUser({
                    username,
                    password,
                    roleId: 1
                })
            }
        const user = await User.getUserByUsername(username);
        
        const newOrder = await Order.createCartOrder({
            orderStatus: true,
            userId: user.id
        })
        
        if (req.session.cart) {
            await Promise.all(req.session.cart.items.map(async (eachItem) => {
                await Item.createCartItem({ productId: eachItem.productId, orderId: newOrder.id, quantity: eachItem.quantity})
            }))
            
        }

        const token = jwt.sign({id: user.id, username,}, JWT_SECRET)
        
        res.send({
            message: "Thank you for signing up",
            token,
            user: {
                id: user.id,
                username,
                roleId: user.roleId
            },
        })
        }
    } catch (error) {
        next(error)
    }
});

router.post("/login", async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.send({
            name: "MissingCredentialsError",
            message: "Please supply both a username and password",
        });
    }

    try {
    const user = await User.getUserByUsername(username);
    const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET);
    const hashedPassword = user.password;
    const isValid = await bcrypt.compare(password, hashedPassword);

    if (user && isValid) {
        if (req.session.cart) {
            const existingOrder = await Order.getActiveCartOrderByUserId(user.id)
            await Promise.all(req.session.cart.items.map(async (eachItem) => {
                await Item.createCartItem({ productId: eachItem.productId, orderId: existingOrder.id, quantity: eachItem.quantity})
            }))
            
        }
      res.send({
        message: "you're logged in!",
        user: {
          id: user.id,
          username,
          roleId: user.roleId
        },
        token: token,
      });
    } else {
      res.send({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
    } catch (error) {
        next(error);
    }
})

router.get("/", requireUser, async (req, res, next) => {
    const user = req.user
    try {
        const role = await Role.getRoleById(user.roleId)
        if (role.name === 'admin') {
            const allUsers = await User.getAllUsers();
            res.send(allUsers)
        } else {
            res.send("User must be an admin to perform this function")
        }
    } catch (error) {
        next(error)
    }
})

router.get("/:userId", requireUser, async (req, res, next) => {
    const { userId } = req.params;
    const user = req.user
    try {
        const role = await Role.getRoleById(user.roleId)
        if (role.name === 'admin') {
            const singleUser = await User.getUserById(userId)
            res.send(singleUser)
        } else {
            res.send("User must be an admin to perform this function")
        }
    } catch (error) {
        next(error)
    }
})

module.exports = router;