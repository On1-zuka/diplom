const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Cart } = require('../models/models');

const generateJwt = (id, email, login, role) => {
    return jwt.sign(
        { id, email, login, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    );
}

class UserController {
    
    async registration(req, res, next) {
        const { login, name, surname, patronymic, address, email, password, phone } = req.body;
    
        // Function to check if a field is empty or contains only spaces
        const isInvalidField = (field) => !field || field.trim().length === 0;
    
        if (
            isInvalidField(login) ||
            isInvalidField(name) ||
            isInvalidField(surname) ||
            isInvalidField(address) ||
            isInvalidField(email) ||
            isInvalidField(password) ||
            isInvalidField(patronymic) ||
            isInvalidField(phone)
        ) {
            return next(ApiError.badRequest('Необходимо указать все данные для регистрации и они не могут быть пустыми'));
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
            const user = await User.create({
                login: login.trim(),
                name: name.trim(),
                surname: surname.trim(),
                patronymic: patronymic.trim(),
                address: address.trim(),
                phone: phone.trim(),
                email: email.trim(),
                password: hashPassword
            });
    
            if (user) {
                const cart = await Cart.create({ userId: user.id });
                const token = generateJwt(user.id, user.email, user.login, user.role);
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

            const token = generateJwt(user.id, user.email, user.login, user.role);

            return res.cookie('token', token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
                domain: 'localhost',
            }).json({ user, message: 'Авторизация прошла успешно' });

        } catch (err) {
            return next(ApiError.internal('Внутренняя ошибка сервера'));
        }
    }

    async profile(req, res, next) {
        try {
            const token = req.cookies.token;
            if (!token) {
                return next(ApiError.unauthorized('Требуется аутентификация'));
            }
            let decodedToken;
            try {
                decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            } catch (err) {
                return next(ApiError.unauthorized('Неверный токен'));
            }
            const userId = decodedToken.id;
            const user = await User.findByPk(userId);

            if (!user) {
                return next(ApiError.notFound('Пользователь не найден'));
            }
            return res.json({ user });
        } catch (err) {
            return next(ApiError.internal('Внутренняя ошибка сервера'));
        }
    }

    async logout(req, res, next) {
        try {
            res.clearCookie('token', { domain: 'localhost' });
            return res.json({ message: 'Выход выполнен успешно' });
        } catch (err) {
            return next(ApiError.internal('Внутренняя ошибка сервера'));
        }
    }

    async editProfile(req, res, next) {
        try {
            const { name, surname, patronymic, phone, address } = req.body;
            const token = req.cookies.token;
    
            if (!token) {
                return next(ApiError.unauthorized('Требуется аутентификация'));
            }
    
            let decodedToken;
            try {
                decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            } catch (err) {
                return next(ApiError.unauthorized('Неверный токен'));
            }
    
            const userId = decodedToken.id;
            const user = await User.findByPk(userId);
    
            if (!user) {
                return next(ApiError.notFound('Пользователь не найден'));
            }
    
            // Function to check if a field is empty or contains only spaces
            const isInvalidField = (field) => !field || field.trim().length === 0;
    
            // Validate all fields
            if (
                isInvalidField(name) ||
                isInvalidField(surname) ||
                isInvalidField(patronymic) ||
                isInvalidField(phone) ||
                isInvalidField(address)
            ) {
                return next(ApiError.badRequest('Все поля должны быть заполнены и не могут содержать только пробелы'));
            }
    
            // Update fields only if they are provided and valid
            user.name = name.trim();
            user.surname = surname.trim();
            user.patronymic = patronymic.trim();
            user.phone = phone.trim();
            user.address = address.trim();
    
            await user.save();
    
            return res.json({ message: 'Данные пользователя успешно обновлены', user });
        } catch (err) {
            return next(ApiError.internal('Внутренняя ошибка сервера'));
        }
    }
    async check(req, res, next) {
        try {
            const token = req.cookies.token;
            if (!token) {
                return next(ApiError.unauthorized('Токен не предоставлен'));
            }
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            const userId = decodedToken.id;

            const user = await User.findByPk(userId);
            if (!user) {
                return next(ApiError.unauthorized('Пользователь не найден'));
            }
            console.log(user)
            return res.json({...user.dataValues, password:undefined});
        } catch (err) {
            return next(ApiError.unauthorized('Невалидный токен'));
        }
    }
}

module.exports = new UserController();
