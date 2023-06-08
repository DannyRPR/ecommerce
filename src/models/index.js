const Category = require("./Category");
const Product = require("./Product");
const ProductImg = require("./ProductImg");
const Cart = require("./Cart");
const User = require("./User");
const Purchase = require("./Purchase");

Category.hasMany(Product);
Product.belongsTo(Category);

Product.hasMany(ProductImg);
ProductImg.belongsTo(Product);

Product.hasMany(Cart);
Cart.belongsTo(Product);

User.hasMany(Cart);
Cart.belongsTo(User);

Purchase.belongsTo(User);
User.hasMany(Purchase);

Purchase.belongsTo(Product);
Product.hasMany(Purchase);
