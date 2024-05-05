const { Cart_product, Products, Cart } = require('../models/models');
const ApiError = require('../error/ApiError');
const { where } = require('sequelize');
const jwt = require('jsonwebtoken');

class CartController {
    async addToCart(req, res, next) {
        try {
            const jwtCookie = req.cookies.token;
            if (!jwtCookie) {
                return next(ApiError.badRequest('JWT не найден в куках'));
            }
            
            const { productId, quantity } = req.body;
            const product = await Products.findByPk(productId);
            if (!product) {
                return next(ApiError.notFound('Товар не найден'));
            }
    
            const decoded = jwt.verify(jwtCookie, process.env.SECRET_KEY);
            const userId = decoded.id;
            if (!userId) {
                return next(ApiError.badRequest('Не удалось получить id пользователя из JWT'));
            }
            let cart = await Cart.findOne({ where: { userId } });
            if (!cart) {
                cart = await Cart.create({ userId });
            }
    
            let cartItem = await Cart_product.findOne({
                where: { productId, cartId: cart.id },
            });
    
            if (cartItem) {
                cartItem.quantity += quantity;
                cartItem.price_cart += product.price * quantity;
                await cartItem.save();
            } else {
                cartItem = await Cart_product.create({
                    productId,
                    cartId: cart.id,
                    quantity,
                    price_cart: product.price * quantity,
                });
            }
            
            return res.json(cartItem);
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async getCart(req, res, next) {
        try {
            const jwtCookie = req.cookies.token;
            console.log('JWT из cookies:', jwtCookie);

            if (!jwtCookie) {
                return next(ApiError.badRequest('JWT не найден в куках'));
            }

            const decoded = jwt.verify(jwtCookie, process.env.SECRET_KEY);
            console.log('Decoded JWT:', decoded);
            const userId = decoded.id;

            if (!userId) {
                return next(ApiError.badRequest('Не удалось получить id пользователя из JWT'));
            }

            const cartItems = await Cart_product.findAll({
            where: { cartId: userId },
            include: [
                {
                    model: Products,
                    attributes: ['name', 'img'],
                },
            ],
        });


            if (cartItems.length === 0) {
                return res.json([]);
            }

            return res.json(cartItems);
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
    
    async removeFromCart(req, res, next) {
        try {
            const jwtCookie = req.cookies.token;
            if (!jwtCookie) {
                return next(ApiError.badRequest('JWT не найден в куках'));
            }
            const decoded = jwt.verify(jwtCookie, process.env.SECRET_KEY);
            const userId = decoded.id;
            if (!userId) {
                return next(ApiError.badRequest('Не удалось получить id пользователя из JWT'));
            }
            const cart = await Cart.findOne({ where: { userId } });
            if (!cart) {
                return next(ApiError.notFound('Корзина не найдена'));
            }
            const cartItem = await Cart_product.findOne({
                where: { cartId: cart.id, productId: req.params.productId },
            });
            if (!cartItem) {
                return next(ApiError.notFound('Товар не найден в корзине'));
            }
            await cartItem.destroy();
    
            return res.json({ message: 'Товар успешно удален из корзины' });
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
    
    async updateItemCart(req, res, next) {
        try {
            const { cartId, productId } = req.params;
            const { quantity } = req.body;
            const product = await Products.findByPk(productId);
            if (isNaN(cartId) || isNaN(productId) || isNaN(quantity) || quantity <= 0) {
                return next(ApiError.badRequest('Некорректные данные'));
            }
            let cartItem = await Cart_product.findOne({
                where: { cartId, productId },
            });
            if (!cartItem) {
                return next(ApiError.notFound('Карточка товара не найдена'));
            }
            cartItem.quantity = quantity;
            cartItem.price_cart = product.price * quantity;
            await cartItem.save();
            return res.json(cartItem);
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
}
module.exports = new CartController;