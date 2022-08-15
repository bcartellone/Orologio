const { TestScheduler } = require('jest');
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
     price DECIMAL(7,2) DEFAULT 0,
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
   
const product1 = await Products.createProduct({name: "SANTOS DE CARTIER WATCH",
description: "Large model, automatic movement, steel, PVD, interchangable metal and rubber straps",
price: 7800,
image: "https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dwc44585a1/images/large/637709291804123442-2059162.png?sw=750&sh=750&sm=fit&sfrm=png",})

const product2 = await Products.createProduct({name: "SANTOS-DUMONT WATCH",
description : "Large model, quartz movement, steel, leather",
price : 4000,
image : "https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dw8d687c03/images/large/637709296017541191-2161441.png?sw=750&sh=750&sm=fit&sfrm=png"})

const product3 = await Products.createProduct ({name: "SANTOS DE CARTIER CHRONOGRAPH WATCH",
description: "Extra-large model, automatic movement, steel, ADLC, interchangable rubber and leather bracelets",
price: 9400,
image : "https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dwc40ebe7c/images/large/637709290545060653-2098282.png?sw=750&sh=750&sm=fit&sfrm=png"})

const product4 = await Products.createProduct ({name: "TANK MUST WATCH",
description: "Small model, high autonomy quartz movement, steel",
price: 3200,
image : "https://cdn2.chrono24.com/images/uhren/20164591-suvn842p63960ujrjssxp1xg-Large.jpg"})

const product5 = await Products.createProduct ({name: "TANK LOUIS CARTIER WATCH",
description: "Large model, hand-wound mechanical movement, rose gold, leather",
price: 12800,
image : "https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dw7b65464c/images/large/637758163780702766-2289877.png?sw=750&sh=750&sm=fit&sfrm=png"})

const product6 = await Products.createProduct ({name: "BALLON BLEU DE CARTIER WATCH",
description: "33 mm, mechanical movement with automatic winding, steel",
price: 5950,
image : "https://content.thewosgroup.com/productimage/17310326/17310326_1.jpg?impolicy=zoom"})

const product7 = await Products.createProduct ({name: "PASHA DE CARTIER WATCH",
description: "30 mm, quartz movement, steel, interchangable metal and leather straps",
price: 5300,
image : "https://www.swissluxury.com/product_images/400/WSPA0013.jpg"})

const product8 = await Products.createProduct ({name: "DOXA",
description: "Sub 300 Whitepearl 42.5mm Mens Watch",
price: 2490,
image : "https://cdn.shopify.com/s/files/1/0072/9205/9757/products/DOXA_SUB_300T_professional_orange_800x.jpg?v=1585736977"})

const product9 = await Products.createProduct ({name: "OMEGA",
description: "Seamaster Diver 300m James Bond 007 2020 Edition",
price: 9200,
image : "https://www.omegawatches.com/media/catalog/product/cache/e7984e6883c65585a016084208a7f1f23dbda14c55ba5f81dd86443eff42d1f8/o/m/omega-seamaster-diver-300m-co-axial-master-chronometer-42-mm-21090422001001-list.jpg"})

const product10 = await Products.createProduct ({name: "BREITLING",
description: "Endurance Pro 44mm Mens Watch Blue",
price: 3300,
image : "https://content.thewosgroup.com/productimage/17532021/17532021_1.jpg?impolicy=zoom"})

const product11 = await Products.createProduct ({name: "HUBLOT",
description: "Spirit Of Big Bang Magic Sapphire 42mm Mens Watches",
price: 90000,
image : "https://www.swissluxury.com/product_images/400/WSPA0013.jpg"})

const product12 = await Products.createProduct ({name: "TUDOR",
description: "Black Bay Automatic Black Dial Men's GMT Pepsi Bezel Watch",
price: 5300,
image : "https://www.swissluxury.com/product_images/400/WSPA0013.jpg"})

const product13 = await Products.createProduct ({name: "TAG HEUER",
description: "Special Edition Formula 1 Red Bull Racing Quartz Chronograph 43mm Mens Watch",
price: 1900,
image : "https://www.swissluxury.com/product_images/400/WSPA0013.jpg"})

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

// console.log(await Products.deleteProduct(1))
// console.log(await User.getUserByUsername('ricky'))
// console.log(await Products.getAllProducts())
// console.log(await Products.getProductById(3))
// console.log(await User.getAllUsers())
// console.log(await Products.updateProduct({id: 1, name: 'test', description: 'this is a test', price: 10, image: 'google.com'}))

 } catch (error) {
   throw error;
 }
};



createTables()
 .then(populateInitialData)
 .catch(console.error)
 .finally(() => client.end());
