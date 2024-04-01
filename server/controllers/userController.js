const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Cart } = require('../models/models')

const generateJwt = (id, email) => {
    return jwt.sign({ id, email }, process.env.SECRET_KEY, { expiresIn: '48h' })
}

class UserController {
    async registration(req, res, next) {
        const { login, name, surname, address, email, password } = req.body;
        if (!login || !name || !surname || !address || !email || !password) {
            return next(ApiError.badRequest('Необходимо указать все данные для регистрации'));
        }
        try {
            const loginCandidate = await User.findOne({ where: { login } });
            const emailCandidate = await User.findOne({ where: { email } });

            if (loginCandidate && emailCandidate) {
                return next(ApiError.badRequest('Пользователь с таким email и login уже существует'));
            } else if (loginCandidate) {
                return next(ApiError.badRequest('Пользователь с таким login уже существует'));
            } else if (emailCandidate) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'));
            }
            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({ login, name, surname, address, email, password: hashPassword });
            if (user) {
                const cart = await Cart.create({ userId: user.id });
                const token = generateJwt(user.id,user.email, user.login, user.password);
                return res.json({ token });
            } else {
                return next(ApiError.unauthorized('Ошибка создания пользователя'));
            }
        } catch (err) {
            return next(ApiError.internal('Внутренняя ошибка сервера'));
        }
    }

    async login(req, res, next) {
        const { email, password } = req.body
        try {
            const user = await User.findOne({ where: { email } })
            if (!user) {
                return next(ApiError.notFound('Пользователь с таким email не найден'))
            }
            let comparePassword = await bcrypt.compare(password, user.password)
            if (!comparePassword) {
                return next(ApiError.unauthorized('Неверный пароль'));
            }
            const token = generateJwt(user.id, user.email)
            return res.json({ token })
        } catch (err) {
            return next(ApiError.internal('Внутренняя ошибка сервера')); // Обработка неожиданных ошибок
        }

    }
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email)
        return res.json({ token })
    }
}
module.exports = new UserController()   