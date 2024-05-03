const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Cart } = require('../models/models')


const generateJwt = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '24h' })
}

class UserController {
    async registration(req, res, next) {
        const { login, name, surname, patronymic, address, email, password, phone } = req.body;
        if (!login || !name || !surname || !address || !email || !password || !patronymic || !phone) {
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
            const user = await User.create({ login, name, surname, patronymic, address, phone, email, password: hashPassword });
            if (user) {
                const cart = await Cart.create({ userId: user.id });
                const token = generateJwt(user.id, user.email, user.login, user.password);
                return res.json({ token });
            } else {
                return next(ApiError.unauthorized('Ошибка создания пользователя'));
            }
        } catch (err) {
            return next(ApiError.internal('Внутренняя ошибка сервера'));
        }
    }

    async login(req, res, next) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return next(ApiError.notFound('Пользователь с таким email не найден'));
            }

            const comparePassword = await bcrypt.compare(password, user.password);
            if (!comparePassword) {
                return next(ApiError.unauthorized('Неверный пароль'));
            }

            const token = generateJwt(user.id);

            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
                domain: 'localhost',
            });

            return res.json({ message: 'Авторизация прошла успешно' });
        } catch (err) {
            return next(ApiError.internal('Внутренняя ошибка сервера'));
        }
    }
    // async check(req, res, next) {
    //     try {
    //         const token = req.headers.authorization.split(' ')[1];
    //         if (!token) {
    //             return next(ApiError.unauthorized('Токен не предоставлен'));
    //         }
    //         const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    //         const userId = decodedToken.id;

    //         const user = await User.findByPk(userId);
    //         if (!user) {
    //             return next(ApiError.unauthorized('Пользователь не найден'));
    //         }
    //         const newToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '24h' });
    //         return res.json({ token: newToken });
    //     } catch (err) {
    //         return next(ApiError.unauthorized('Невалидный токен'));
    //     }
    // }
    async profile(req, res, next) {
        try {
            // Получаем токен из cookies
            const token = req.cookies.token;
            // Проверяем, есть ли токен
            if (!token) {
                return next(ApiError.unauthorized('Требуется аутентификация'));
            }
            // Проверяем токен на валидность
            let decodedToken;
            try {
                decodedToken = jwt.verify(token, process.env.SECRET_KEY); // Замените process.env.JWT_SECRET на ваш секретный ключ JWT
            } catch (err) {
                return next(ApiError.unauthorized('Неверный токен'));
            }
            // Получаем ID пользователя из декодированного токена
            const userId = decodedToken.id;

            // Проверяем существование пользователя в базе данных
            const user = await User.findByPk(userId);

            if (!user) {
                return next(ApiError.notFound('Пользователь не найден'));
            }
            // Отправляем данные пользователя клиенту
            return res.json({ user });
        } catch (err) {
            return next(ApiError.internal('Внутренняя ошибка сервера'));
        }
    }
}

module.exports = new UserController()   