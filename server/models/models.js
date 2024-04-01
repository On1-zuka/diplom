const sequelize = require('../db');
const { DataTypes, BOOLEAN } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: DataTypes.STRING, allowNull: false, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
})

const Cart = sequelize.define('cart', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: { type: DataTypes.INTEGER },
    orderTime: { type: DataTypes.DATE },
    pickup: { type: BOOLEAN },
})

const Cart_product = sequelize.define('cart_product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    quantity: { type: DataTypes.INTEGER },
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
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    prise: { type: DataTypes.DOUBLE, allowNull: false },
    rating: { type: DataTypes.DOUBLE, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    discount: { type: DataTypes.DOUBLE },
    country: { type: DataTypes.STRING, allowNull: false },
    purpose: { type: DataTypes.STRING, allowNull: false },
    article: { type: DataTypes.STRING, allowNull: false },
})

const Favorite = sequelize.define('favorite', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Favorite_product = sequelize.define('favorite_product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

User.hasOne(Cart)
Cart.belongsTo(User)

Brands.hasMany(Products)
Products.belongsTo(Brands)

Categories.hasMany(Products)
Products.belongsTo(Categories)

Cart.belongsToMany(Products, { through: Cart_product });
Products.belongsToMany(Cart, { through: Cart_product });

Favorite.belongsToMany(Products, { through: Favorite_product })
Products.belongsToMany(Favorite, { through: Favorite_product })

module.exports = {
    User,
    Cart,
    Cart_product,
    Brands,
    Categories,
    Products,
    Favorite,
    Favorite_product
}
