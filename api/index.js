const apiRouter = require('express').Router();
const { JWT_SECRET } = process.env;
const { User } = require("../db/DB_cyborg flying.js")
// const { getUserById } =require('')
const jwt = require("jsonwebtoken")

apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header("Authorization");

  if(!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await User.getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next ({ name, message });
    }
  } else {
    next({
      name: "AuthorizatonHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

// place your routers here
// ROUTER: /api/products
const productsRouter = require("./products");
apiRouter.use("/products", productsRouter);

// ROUTER: /api/users
const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

// Router: /api/cart_orders
const orderRouter = require("./cart_orders");
apiRouter.use("/cart_orders", orderRouter);

// Router: /api/cart_items
const itemsRouter = require("./cart_items");
apiRouter.use("/cart_items", itemsRouter)

module.exports = apiRouter;
