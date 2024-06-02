const { Cart_product, Cart, User } = require('../models/models');
const moment = require('moment');
const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken');

class OrderController {
    async fillingOrder(req, res, next) {
        const jwtCookie = req.cookies.token;
        const { orderDate, pickup, orderTime, finalPrice, usePoints } = req.body;

        if (!orderDate || pickup === undefined || !orderTime || !finalPrice) {
            return next(ApiError.badRequest('Необходимо указать все данные для заявки'));
        }

        try {
            const decoded = jwt.verify(jwtCookie, process.env.SECRET_KEY);
            const userId = decoded.id;

            if (!userId || typeof userId !== 'number') {
                return next(ApiError.badRequest('Не удалось получить id пользователя из JWT'));
            }

            const formattedOrderDate = orderDate.split('.').reverse().join('-');

            const isPickup = pickup === true;
            let formattedOrderTime = orderTime;
            let totalPrice = parseFloat(finalPrice);

            if (isPickup) {
                formattedOrderTime = null;
            } else {
                totalPrice += 10.00;
            }

            const user = await User.findByPk(userId);
            if (!user) {
                return next(ApiError.notFound('Пользователь не найден'));
            }

            let userScores = user.scores;
            const priceThreshold = 20.00;
            const bonusPointsPerAmount = 2;
            let scoresUsed = 0;

            if (usePoints) {
                if (totalPrice < priceThreshold) {
                    return next(ApiError.badRequest('Общая сумма должна быть не менее 20.00 для использования бонусных баллов'));
                }
                const maxScoresToUse = Math.floor(totalPrice / 2);
                const scoresToUse = Math.min(userScores, maxScoresToUse);
                const scoresAmountToUse = scoresToUse * 0.5;
                totalPrice -= scoresAmountToUse;
                userScores -= scoresToUse;
                scoresUsed = scoresToUse;
                await user.update({ scores: userScores });

                const spentAmount = totalPrice + scoresAmountToUse;
                const bonusPointsEarned = Math.floor(spentAmount / 10);

                userScores += bonusPointsEarned;
                await user.update({ scores: userScores });
            } else {
                const bonusPointsEarned = Math.floor(totalPrice / 10);
                userScores += bonusPointsEarned;
                await user.update({ scores: userScores });
            }

            const updatedCart = await Cart.update(
                {
                    orderDate: formattedOrderDate,
                    pickup: isPickup,
                    orderTime: formattedOrderTime,
                    finalPrice: totalPrice,
                    status: 2
                },
                {
                    where: { userId: userId },
                    returning: true,
                    plain: true,
                }
            );

            if (updatedCart[0] === 0) {
                return next(ApiError.notFound('Заказ с указанным ID не найден'));
            }

            return res.json({
                updatedCart: updatedCart[1],
                finalPrice: totalPrice.toFixed(2),
                scoresUsed
            });
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }
    async fullOrder(req, res, next) {
        try {
            const carts = await Cart.findAll({
                where: {
                    status: 2
                },
                include: [{
                    model: User,
                    attributes: ['name', 'surname', 'patronymic', 'email']
                }]
            });

            const formattedCarts = carts.map(cart => {
                return {
                    ...cart.toJSON(),
                    orderDate: cart.orderDate ? new Date(cart.orderDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }) : null,
                    
                };
            });

            res.json(formattedCarts);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error retrieving carts' });
        }
    }
    async updateOrderStatus(req, res, next) {
        const { id } = req.params;
        const { status } = req.body;

        try {
            const cart = await Cart.findByPk(id);
            if (!cart) {
                return res.status(404).json({ message: 'Заказ не найден' });
            }

            cart.status = status;
            await cart.save();

            res.status(200).json({ message: 'Статус заказа успешно обновлен' });
        } catch (error) {
            console.error('Ошибка при обновлении статуса заказа:', error);
            res.status(500).json({ message: 'Внутренняя ошибка сервера' });
        }
    }
}

module.exports = new OrderController;
