const sequelize = require('../db');
const { DataTypes, BOOLEAN } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: DataTypes.STRING, allowNull: false, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    patronymic: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    scores: {type: DataTypes.INTEGER, defaultValue: 0},
    role: {type: DataTypes.STRING, defaultValue: 'buyer' }
})

const Cart = sequelize.define('cart', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: { type: DataTypes.INTEGER },
    orderDate: { type: DataTypes.DATE },
    pickup: { type: BOOLEAN },
    orderTime:{ type: DataTypes.STRING},
    finalPrice: {type: DataTypes.REAL}
})

const Cart_product = sequelize.define('cart_product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    quantity: { type: DataTypes.INTEGER },
    price_cart: {type: DataTypes.REAL},
})

const Brands = sequelize.define('brands', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    img: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Categories = sequelize.define('categories', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    img: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Products = sequelize.define('products', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    img: { type: DataTypes.STRING, allowNull: false },
    quantity_product: {type: DataTypes.INTEGER, defaultValue: 0},
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.REAL, allowNull: false },
    rating: { type: DataTypes.DOUBLE, allowNull: false, defaultValue: 0 },
    description: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },
    purpose: { type: DataTypes.STRING, allowNull: false },
    article: { type: DataTypes.STRING, allowNull: false },
})


User.hasOne(Cart)
Cart.belongsTo(User)


Brands.hasMany(Products)
Products.belongsTo(Brands)

Categories.hasMany(Products)
Products.belongsTo(Categories)


Cart_product.belongsTo(Products, { foreignKey: 'productId' });
Products.hasMany(Cart_product, { foreignKey: 'productId' });
Cart.belongsToMany(Products, { through: Cart_product });
Products.belongsToMany(Cart, { through: Cart_product });

module.exports = {
    User,
    Cart,
    Cart_product,
    Brands,
    Categories,
    Products,
}
