const {
  client,
  User,
  Products,
  Role
} = require('./DB_cyborg flying');

   async function createTables(){
 
       client.connect();
        await client.query(`
   DROP TABLE IF EXISTS cart_items;
   DROP TABLE IF EXISTS cart_order;
   DROP TABLE IF EXISTS users;
   DROP TABLE IF EXISTS role;
   DROP TABLE IF EXISTS products;
   `);
       console.log('creating tables')
   await client.query(`
   CREATE TABLE products(
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     description TEXT NOT NULL,
     price DECIMAL(5,2) DEFAULT 0,
     image TEXT
     );
     
     CREATE TABLE role(
       id SERIAL PRIMARY KEY,
       name VARCHAR(255) NOT NULL
     );
   
      CREATE TABLE users(
       id SERIAL PRIMARY KEY,
       username VARCHAR(255) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL,
       "roleId" INTEGER REFERENCES role(id)
     );

     CREATE TABLE cart_order(
       id SERIAL PRIMARY KEY,
       "orderStatus" BOOLEAN DEFAULT TRUE,
       "userId" INTEGER REFERENCES users(id)

     );

     CREATE TABLE cart_items(
       id SERIAL PRIMARY KEY,
       "productId" INTEGER REFERENCES products(id),
       "orderId" INTEGER REFERENCES cart_order(id)

     );

     
     
     `)
     console.log("finished creating tables")
   // drop tables in correct order
  

   // build tables in correct order
   
 };

async function populateInitialData() {
 try {
   // create useful starting data by leveraging your
   // Model.method() adapters to seed your db, for example:
   // const user1 = await User.createUser({ ...user info goes here... })
   
const product1 = await Products.createProduct({name: "Special",
description: "special",
price: 145.99,
image: "google.com",})

const product2 = await Products.createProduct({name: "Ferme",
description : "special",
price : 125.99,
image : "google.com"})

const product3 = await Products.createProduct ({name: "Duke",
description: "duke",
price: 200.99,
image :"google.com"})

const product4 = await Products.createProduct ({name: "Monarch",
description: "monarch",
price: 165.99,
image :" google.com"})

const product5 = await Products.createProduct ({name: "Montblane",
description: "montblane",
price: 85.99,
image :" google.com"})

const product6 = await Products.createProduct ({name: "Jaeger",
description: "Jaeger",
price: 105.99,
image :"google.com"})

const product7 = await Products.createProduct ({name: "Test",
description: "Product",
price: 105.99,
image :"google.com"})


const customerRole = await Role.createRole('customer')
const adminRole = await Role.createRole('admin')

const user1 = await User.createUser({username: 'jeff', password: 'bezos', roleId: 1});
const user2 = await User.createUser({username: 'ricky', password: 'sophin', roleId: 2});
const user3 = await User.createUser({username: 'elon', password: 'musk', roleId: 1});
const user4 = await User.createUser({username: 'guest', password: 'user', roleId: 1});
const user5 = await User.createUser({username: 'bill', password: 'gates', roleId: 1});
const user6 = await User.createUser({username: 'daniel', password: 'landis', roleId: 2});
const user7 = await User.createUser({username: 'bennett', password: 'cartellone', roleId: 2});
const user8 = await User.createUser({username: 'mark', password: 'zuckerberg', roleId: 1});
const user9 = await User.createUser({username: 'harry', password: 'potter', roleId: 1});
const user10 = await User.createUser({username: 'morpheus', password: 'dream', roleId: 1});

// console.log(await User.getUserByUsername('ricky'))
// console.log(await Products.getAllProducts())
// console.log(await Products.getProductById(3))
// console.log(await User.getAllUsers())


 } catch (error) {
   throw error;
 }
};



createTables()
 .then(populateInitialData)
 .catch(console.error)
 .finally(() => client.end());
