const { Cart_product, Cart } = require('../models/models')
const moment = require('moment');
const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken');

class OrderController {
    async fillingOrder(req, res, next) {
        const jwtCookie = req.cookies.token;
        const { orderDate, pickup, orderTime, finalPrice } = req.body;
    
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
                totalPrice += 10.00;
            } else {
                formattedOrderTime = null;
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
    
            return res.json(updatedCart[1]);
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }
    

}
module.exports = new OrderController;