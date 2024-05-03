const { Products, Brands } = require('../models/models')
const ApiError = require("../error/ApiError")
const uuid = require('uuid')
const path = require('path')
const mime = require('mime');
const { Op } = require('sequelize');

class ProductController {
    async create(req, res, next) {
        try {
            if (!req.files || !req.files.img) {
                return next(ApiError.badRequest("Изображение не было загружено"));
            }

            const { brandId, categoryId, name, price, description, discount, country, purpose, article, quantity_product, set } = req.body;
            const { img } = req.files;

            const parsedPrice = parseFloat(price);
            if (isNaN(parsedPrice) || parsedPrice <= 0) {
                return next(ApiError.badRequest("Некорректное значение цены"));
            }

            const parsedQuantity = parseInt(quantity_product);
            if (isNaN(parsedQuantity) || !Number.isInteger(parsedQuantity) || parsedQuantity <= 0) {
                return next(ApiError.badRequest("Некорректное значение количества товара"));
            }

            const mimeType = mime.lookup(img.name);
            if (!mimeType.startsWith('image/')) {
                return next(ApiError.badRequest("Пожалуйста, загрузите изображение"));
            }

            const fileExtension = img.name.split('.').pop();
            const fileName = uuid.v4() + "." + fileExtension;
            await img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const existingProduct = await Products.findOne({ where: { article } });
            if (existingProduct) {
                return next(ApiError.badRequest("Товар с таким артикулом уже существует"));
            }
            const product = await Products.create({
                img: fileName,
                name,
                price: parsedPrice,
                description,
                discount,
                country,
                purpose,
                article,
                quantity_product: parsedQuantity,
                brandId,
                categoryId,
                set
            });

            if (!product) {
                return next(ApiError.badRequest("Не удалось создать товар. Проверьте все поля на корректность ввода"));
            }

            return res.json(product);
        } catch (e) {
            return next(ApiError.internal("Внутренняя ошибка сервера: " + e.message));
        }
    }
    async getAll(req, res, next) {
        try {
            let { brandId, categoryId, limit, page } = req.query;
            page = page || 1;
            limit = limit || 9;
            const offset = page * limit - limit;
            let product;

            if (!brandId && !categoryId) {
                product = await Products.findAndCountAll({ limit, offset });
            } else if (brandId && !categoryId) {
                product = await Products.findAndCountAll({ where: { brandId }, limit, offset });
            } else if (!brandId && categoryId) {
                product = await Products.findAndCountAll({ where: { categoryId }, limit, offset });
            } else if (brandId && categoryId) {
                product = await Products.findAndCountAll({ where: { categoryId, brandId }, limit, offset });
            }

            return res.json(product);
        } catch (e) {
            return next(ApiError.badRequest("Ошибка сервера"));
        }
    }
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            if (isNaN(id)) {
                return next(ApiError.badRequest("Некорректный формат ID товара"));
            }
            const product = await Products.findOne({
                where: { id },
                include: [
                    { model: Brands, attributes: ['name'] } // Включаем модель Brands и указываем, что нужно вернуть только поле name
                ]
            });
            if (!product) {
                return next(ApiError.notFound("Товар не найден"));
            }
            return res.json(product);
        } catch (e) {
            return next(ApiError.internal("Внутренняя ошибка сервера: " + e.message));
        }
    }
    async deleteOne(req, res, next) {
        try {
            const { id } = req.params;
            if (isNaN(id)) {
                return next(ApiError.badRequest("Некорректный формат ID товара"));
            }
            const product = await Products.findOne({ where: { id } });
            if (!product) {
                return next(ApiError.notFound("Товар не найден"));
            }
            await Products.destroy({ where: { id } });
            return res.json({ message: 'Товар успешно удален' })
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const updates = req.body;
            if (isNaN(id)) {
                return next(ApiError.badRequest("Некорректный формат ID товара"));
            }
            const productToUpdate = await Products.findOne({ where: { id } });
            if (!productToUpdate) {
                return next(ApiError.notFound("Товар не найден"));
            }

            if (Object.keys(updates).length === 0) {
                return res.status(400).json({ message: "Нет данных для обновления" });
            }

            if ('article' in updates && updates.article !== productToUpdate.article) {
                const existingProduct = await Products.findOne({ where: { article: updates.article } });
                if (existingProduct && existingProduct.id !== id) {
                    return next(ApiError.badRequest("Товар с таким артикулом уже существует"));
                }
            }

            if ('quantity_product' in updates) {
                const parsedQuantity = parseInt(updates.quantity_product);
                if (isNaN(parsedQuantity) || !Number.isInteger(parsedQuantity) || parsedQuantity < 0) {
                    return next(ApiError.badRequest("Некорректное значение количества товара"));
                }
                productToUpdate.quantity_product = parsedQuantity;
            }

            for (const key of Object.keys(updates)) {
                if (key !== 'quantity_product' && key !== 'price') {
                    productToUpdate[key] = updates[key];
                }
            }

            await productToUpdate.save();
            return res.json(productToUpdate);
        } catch (e) {
            return next(ApiError.internal("Внутренняя ошибка сервера: " + e.message));
        }
    }
    async search(req, res, next) {
        try {
            const { query } = req.query;
            if (!query) {
                return res.status(400).json({ error: 'Query parameter is missing' });
            }
    
            const searchQuery = query.toLowerCase();
    
            const products = await Products.findAll({
                where: {
                    name: { [Op.iLike]: `%${searchQuery}%` }
                }
            });
    
            return res.json(products);
        } catch (e) {
            console.error('Error in search controller:', e);
            return next(ApiError.internal("Internal server error: " + e.message));
        }
    }
    
}

module.exports = new ProductController()