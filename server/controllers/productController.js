const { Products, Brands, Categories } = require('../models/models')
const ApiError = require("../error/ApiError")
const uuid = require('uuid')
const path = require('path')
const mime = require('mime');
const fs = require('fs');
const { Op } = require('sequelize');

class ProductController {
    async create(req, res, next) {
        try {
            if (!req.files || !req.files.img) {
                return next(ApiError.badRequest("Изображение не было загружено"));
            }
    
            const { brandId, categoryId, name, price, description, country, purpose, article, quantity_product } = req.body;
            const { img } = req.files;
    
            // Check if any required field is empty
            if (!brandId || !categoryId || !name || !price || !description || !country || !purpose || !article || !quantity_product) {
                return next(ApiError.badRequest("Пожалуйста, заполните все поля"));
            }
    
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
                country,
                purpose,
                article,
                quantity_product: parsedQuantity,
                brandId,
                categoryId,
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
            let { brandId, categoryId, limit, page, minPrice, maxPrice, inStock } = req.query;
            page = page || 1;
            limit = limit || 9;
            const offset = page * limit - limit;
            let product;

            const whereClause = {};

            if (minPrice !== undefined && maxPrice !== undefined) {
                whereClause.price = { [Op.between]: [minPrice, maxPrice] };
            }

            if (inStock !== undefined) {
                if (inStock === 'yes') {
                    whereClause.quantity_product = { [Op.gt]: 0 };
                } else if (inStock === 'no') {
                    whereClause.quantity_product = { [Op.eq]: 0 };
                }
            }

            if (!brandId && !categoryId) {
                product = await Products.findAndCountAll({ where: whereClause, limit, offset });
            } else if (brandId && !categoryId) {
                whereClause.brandId = brandId;
                product = await Products.findAndCountAll({ where: whereClause, limit, offset });
            } else if (!brandId && categoryId) {
                const categoryIdArray = categoryId.split(',').map(Number);
                whereClause.categoryId = categoryIdArray;
                product = await Products.findAndCountAll({ where: whereClause, limit, offset });
            } else if (brandId && categoryId) {
                const categoryIdArray = categoryId.split(',').map(Number);
                whereClause.categoryId = categoryIdArray;
                whereClause.brandId = brandId;
                product = await Products.findAndCountAll({ where: whereClause, limit, offset });
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
                    { model: Brands, attributes: ['name'] },
                    { model: Categories, attributes: ['name'] }
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
            const { img } = req.files || {};

            // Проверка на корректный формат ID товара
            if (isNaN(id)) {
                return next(ApiError.badRequest("Некорректный формат ID товара"));
            }

            // Поиск товара по ID
            const productToUpdate = await Products.findOne({ where: { id } });
            if (!productToUpdate) {
                return next(ApiError.notFound("Товар не найден"));
            }

            // Проверка наличия данных для обновления
            if (Object.keys(updates).length === 0) {
                return res.status(400).json({ message: "Нет данных для обновления" });
            }

            // Проверка на заполненность всех полей и недопустимость пробелов
            for (const [key, value] of Object.entries(updates)) {
                if (typeof value === 'string' && !value.trim()) {
                    return next(ApiError.badRequest(`Поле(я) не должно быть пустым или содержать только пробелы`));
                }
            }

            if ('name' in updates && updates.name.length > 150) {
                return next(ApiError.badRequest("Поле название не должно превышать 150 символов"));
            }
            if ('description' in updates && updates.description.length > 500) {
                return next(ApiError.badRequest("Поле описания не должно превышать 500 символов"));
            }
            if ('country' in updates && updates.country.length > 50) {
                return next(ApiError.badRequest("Поле Страна не должно превышать 50 символов"));
            }
            if ('purpose' in updates && updates.purpose.length > 100) {
                return next(ApiError.badRequest("Поле предназначение не должно превышать 100 символов"));
            }
            if ('article' in updates && updates.article.length > 5) {
                return next(ApiError.badRequest("Поле артикул не должно превышать 5 символов"));
            }

            // Проверка уникальности артикула
            if ('article' in updates && updates.article !== productToUpdate.article) {
                const existingProduct = await Products.findOne({ where: { article: updates.article } });
                if (existingProduct && existingProduct.id !== id) {
                    return next(ApiError.badRequest("Товар с таким артикулом уже существует"));
                }
            }

            // Проверка и преобразование количества товара
            if ('quantity_product' in updates) {
                const parsedQuantity = parseInt(updates.quantity_product);
                if (isNaN(parsedQuantity) || !Number.isInteger(parsedQuantity) || parsedQuantity < 0) {
                    return next(ApiError.badRequest("Некорректное значение количества товара"));
                }
                productToUpdate.quantity_product = parsedQuantity;
            }

            // Проверка и преобразование цены товара
            if ('price' in updates) {
                const parsedPrice = parseFloat(updates.price);
                if (isNaN(parsedPrice) || parsedPrice <= 0) {
                    return next(ApiError.badRequest("Некорректное значение цены товара"));
                }
                productToUpdate.price = parsedPrice;
            }

            
            if ('brandId' in updates) {
                const parsedBrandId = parseInt(updates.brandId);
                if (isNaN(parsedBrandId) || parsedBrandId <= 0) {
                    return next(ApiError.badRequest("Некорректное значение brandId"));
                }
                productToUpdate.brandId = parsedBrandId;
            }
            

            if ('categoryId' in updates) {
                const parsedCategoryId = parseInt(updates.categoryId);
                if (isNaN(parsedCategoryId) || parsedCategoryId <= 0) {
                    return next(ApiError.badRequest("Некорректное значение categoryId"));
                }
                productToUpdate.categoryId = parsedCategoryId;
            }
            

            if (img) {
                const allowedExtensions = ['jpg', 'jpeg', 'png'];
                const fileExtension = img.name.split('.').pop().toLowerCase();
                if (!allowedExtensions.includes(fileExtension)) {
                    return next(ApiError.badRequest('Недопустимый тип файла. Разрешены только JPG, JPEG, PNG'));
                }

                if (productToUpdate.img) {
                    const oldFilePath = path.resolve(__dirname, '..', 'static', productToUpdate.img);
                    if (fs.existsSync(oldFilePath)) {
                        fs.unlinkSync(oldFilePath);
                    }
                }

                const fileName = uuid.v4() + "." + fileExtension;
                const filePath = path.resolve(__dirname, '..', 'static', fileName);
                try {
                    await img.mv(filePath);
                    productToUpdate.img = fileName;
                } catch (err) {
                    return next(ApiError.internal('Ошибка при сохранении нового изображения'));
                }
            }

            // Обновление остальных полей товара
            for (const key of Object.keys(updates)) {
                if (key !== 'quantity_product' && key !== 'price' && key !== 'brandId' && key !== 'categoryId') {
                    productToUpdate[key] = updates[key];
                }
            }
            // Сохранение обновленного товара
            await productToUpdate.save();
            return res.json(productToUpdate);
        } catch (e) {
            // Обработка внутренней ошибки сервера
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

    async getMaxPriceProduct(req, res, next) {
        try {
            const { brandId, categoryId, minPrice, maxPrice } = req.query;

            const whereClause = {};

            if (minPrice !== undefined && maxPrice !== undefined) {
                whereClause.price = { [Op.between]: [minPrice, maxPrice] };
            }

            if (brandId !== undefined) {
                whereClause.brandId = brandId;
            }

            if (categoryId !== undefined) {
                const categoryIdArray = categoryId.split(',').map(Number);
                whereClause.categoryId = categoryIdArray;
            }

            const maxPriceProduct = await Products.findOne({
                where: whereClause,
                order: [['price', 'DESC']],
                attributes: ['price'],
            });

            if (!maxPriceProduct) {
                throw ApiError.notFound('Продукт не найден');
            }

            return res.json(maxPriceProduct.price);
        } catch (e) {
            return next(ApiError.badRequest('Ошибка сервера'));
        }
    }
    // async getProductsByBrand(req, res, next) {
    //     try {
    //         const { brandId } = req.params;

    //         if (!brandId) {
    //             return next(ApiError.badRequest('Не указан идентификатор бренда'));
    //         }

    //         const products = await Products.findAll({
    //             where: { brandId },
    //         });

    //         return res.json(products);
    //     } catch (e) {
    //         console.error('Error in getProductsByBrand controller:', e);
    //         return next(ApiError.internal("Внутренняя ошибка сервера: " + e.message));
    //     }
    // }
}

module.exports = new ProductController()
