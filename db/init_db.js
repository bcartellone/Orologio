const { TestScheduler } = require('jest');
const {
  client,
  User,
  Products,
  Role,
  Item,
  Order
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
     price DECIMAL(8,2) DEFAULT 0,
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
       "orderId" INTEGER REFERENCES cart_order(id),
       quantity INTEGER

     );

     `)
     console.log("finished creating tables")
   
 };

async function populateInitialData() {
 try {
   // create useful starting data by leveraging your
   // Model.method() adapters to seed your db, for example:
   // const user1 = await User.createUser({ ...user info goes here... })
   
const product1 = await Products.createProduct({name: "SANTOS DE CARTIER WATCH",
description: "Large model, automatic movement, steel, PVD, interchangable metal and rubber straps",
price: 7800,
image: "https://i.postimg.cc/44p12B27/1-SANTOS-DE-CARTIER-WATCH.jpg",})

const product2 = await Products.createProduct({name: "SANTOS-DUMONT WATCH",
description : "Large model, quartz movement, steel, leather",
price : 4000,
image : "https://i.postimg.cc/rFBMyyCY/2-SANTOS-DUMONT-WATCH.jpg"})

const product3 = await Products.createProduct ({name: "SANTOS DE CARTIER CHRONOGRAPH WATCH",
description: "Extra-large model, automatic movement, steel, ADLC, interchangable rubber and leather bracelets",
price: 9400,
image : "https://i.postimg.cc/PNG9HJsW/3-SANTOS-DE-CARTIER-CHRONOGRAPH.jpg"})

const product4 = await Products.createProduct ({name: "TANK MUST WATCH",
description: "Small model, high autonomy quartz movement, steel",
price: 3200,
image : "https://i.postimg.cc/5yv1LZfm/4-TANK-MUST-WATCH.jpg"})

const product5 = await Products.createProduct ({name: "TANK LOUIS CARTIER WATCH",
description: "Large model, hand-wound mechanical movement, rose gold, leather",
price: 12800,
image : "https://i.postimg.cc/3wRTnyKN/5-TANK-LOUIS-CARTIER.jpg"})

const product6 = await Products.createProduct ({name: "BALLON BLEU DE CARTIER WATCH",
description: "33 mm, mechanical movement with automatic winding, steel",
price: 5950,
image : "https://i.postimg.cc/QN5r4ZrQ/6-BALLON-BLEU-DE-CARTIER-WATCH.jpg"})

const product7 = await Products.createProduct ({name: "PASHA DE CARTIER WATCH",
description: "30 mm, quartz movement, steel, interchangable metal and leather straps",
price: 5300,
image : "https://i.postimg.cc/L8ydYHzp/7-PASHA-DE-CARTIER-WATCH.jpg"})

const product8 = await Products.createProduct ({name: "DOXA",
description: "Sub 300 Whitepearl 42.5mm Mens Watch",
price: 2490,
image : "https://i.postimg.cc/Y2QJNN18/8-DOXA.jpg"})

const product9 = await Products.createProduct ({name: "OMEGA",
description: "Seamaster Diver 300m James Bond 007 2020 Edition",
price: 9200,
image : "https://i.postimg.cc/05GBKksB/9-OMEGA.jpg"})

const product10 = await Products.createProduct ({name: "BREITLING",
description: "Endurance Pro 44mm Mens Watch Blue",
price: 3300,
image : "https://i.postimg.cc/wv8w3Pbz/10-BREITLING.jpg"})

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

const product14 = await Products.createProduct ({name: "Marine Hora Mundi 5557",
description: "Marine Hora Mundi wristwatch in gold. Self-winding movement. Dual preset time zones with instant-jump and synchronised date, day/night and city displays. Blue dial in gold, hand-engraved on a rose engine, with sapphire metallization. Luminescent hands and hour-markers. Sapphire caseback. Screw-locked crown. Water-resistant to 10 bar (100m). Diameter: 43.9mm.",
price: 72700,
image : "https://www.breguet.com/sites/default/files/styles/page_modele_preview/public/gardetemps/variante/soldat/5557BBYS5WV.jpg?itok=pbJ9swDR"})

const product15 = await Products.createProduct ({name: "Répétition Minutes 7637",
description: "Classique “Grande Complication” minute repeater wristwatch in 18-carat gold. Hand-wound movement, engraved by hand. Sapphire caseback. Diameter : 42 mm.",
price: 237000,
image : "https://www.breguet.com/sites/default/files/styles/page_modele_preview/public/gardetemps/variante/soldat/7637BB2Y9ZU-1.jpg?itok=NewujltN"})

const product16 = await Products.createProduct ({name: "Tradition 7035",
description: "Tradition watch in 18-carat gold. Bezel set with 68 diamonds weighing approx. 0.8ct. Self-winding movement with retrograde seconds. Gold movement plate and bridges paved with 190 diamonds, approx. 0.45ct. Retrograde seconds indicator set with 2 rubies and 7 pink sapphires. Silicon Breguet balance-spring. Off-centred gold dial paved with 74 diamonds, approx. 0.19ct. Chapter ring in white mother-of-pearl. Sapphire caseback. Water-resistant to 3 bar (30 m). Diameter: 37mm.",
price: 79900,
image : "https://www.breguet.com/sites/default/files/styles/page_modele_preview/public/gardetemps/variante/soldat/7035brd89v6-d00d_face_0.jpg?itok=oHwhtHNB"})

const product17 = await Products.createProduct ({name: "Reine de Naples 8938",
description: "Special Edition Formula 1 Red Bull Racing Quartz Chronograph 43mm Mens Watch",
price: 1900,
image : "https://www.swissluxury.com/product_images/400/WSPA0013.jpg"})

const product18 = await Products.createProduct ({name: "TAG HEUER",
description: "Special Edition Formula 1 Red Bull Racing Quartz Chronograph 43mm Mens Watch",
price: 1900,
image : "https://www.swissluxury.com/product_images/400/WSPA0013.jpg"})

const product19 = await Products.createProduct ({name: "TAG HEUER",
description: "Special Edition Formula 1 Red Bull Racing Quartz Chronograph 43mm Mens Watch",
price: 1900,
image : "https://www.swissluxury.com/product_images/400/WSPA0013.jpg"})

const product20 = await Products.createProduct ({name: "TAG HEUER",
description: "Special Edition Formula 1 Red Bull Racing Quartz Chronograph 43mm Mens Watch",
price: 1900,
image : "https://www.swissluxury.com/product_images/400/WSPA0013.jpg"})

const product21 = await Products.createProduct ({name: "TAG HEUER",
description: "Special Edition Formula 1 Red Bull Racing Quartz Chronograph 43mm Mens Watch",
price: 1900,
image : "https://www.swissluxury.com/product_images/400/WSPA0013.jpg"})

const product22 = await Products.createProduct ({name: "TAG HEUER",
description: "Special Edition Formula 1 Red Bull Racing Quartz Chronograph 43mm Mens Watch",
price: 1900,
image : "https://www.swissluxury.com/product_images/400/WSPA0013.jpg"})

const product23 = await Products.createProduct ({name: "TAG HEUER",
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

const order1 = await Order.createCartOrder({orderStatus: false, userId: 1})
const order2 = await Order.createCartOrder({orderStatus: true, userId: 2})
const order3 = await Order.createCartOrder({orderStatus: true, userId: 3})
const order4 = await Order.createCartOrder({orderStatus: true, userId: 4})
const order5 = await Order.createCartOrder({orderStatus: false, userId: 5})
const order6 = await Order.createCartOrder({orderStatus: true, userId: 6})
const order7 = await Order.createCartOrder({orderStatus: true, userId: 7})
const order8 = await Order.createCartOrder({orderStatus: true, userId: 8})
const order9 = await Order.createCartOrder({orderStatus: true, userId: 9})
const order10 = await Order.createCartOrder({orderStatus: true, userId: 10})

const item1 = await Item.createCartItem({productId: 13, orderId: 10, quantity: 2})
const item2 = await Item.createCartItem({productId: 5, orderId: 9, quantity: 2})
const item3 = await Item.createCartItem({productId: 7, orderId: 2, quantity: 2})
const item4 = await Item.createCartItem({productId: 8, orderId: 3, quantity: 2})
const item5 = await Item.createCartItem({productId: 5, orderId: 9, quantity: 2})
const item6 = await Item.createCartItem({productId: 8, orderId: 3, quantity: 2})
const item7 = await Item.createCartItem({productId: 10, orderId: 6, quantity: 2})
const item8 = await Item.createCartItem({productId: 10, orderId: 7, quantity: 2})
const item9 = await Item.createCartItem({productId: 11, orderId: 2, quantity: 2})
const item10 = await Item.createCartItem({productId: 6, orderId: 3, quantity: 2})
const item11 = await Item.createCartItem({productId: 11, orderId: 2, quantity: 2})
const item12 = await Item.createCartItem({productId: 6, orderId: 2, quantity: 2})

 } catch (error) {
   throw error;
 }
};



createTables()
 .then(populateInitialData)
 .catch(console.error)
 .finally(() => client.end());
