const { Categories } = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
const mime = require('mime-types');

class CategoryController {
    async create(req, res, next) {
        try {
            if (!req.files || !req.files.img) {
                return next(ApiError.badRequest('Изображение не было загружено'));
            }
            const { name } = req.body
            if (!name) {
                return next(ApiError.badRequest('Необходимо указать название категории'));
            }
            const { img } = req.files
            const mimeType = mime.lookup(img.name);
            if (!mimeType.startsWith('image/')) {
                return next(ApiError.badRequest('Пожалуйста, загрузите изображение'));
            }
            const existingCategory = await Categories.findOne({ where: { name } });
            if (existingCategory) {
                return next(ApiError.badRequest('Категория с таким названием уже существует'));
            }
            const fileExtension = img.name.split('.').pop();
            const fileName = uuid.v4() + "." + fileExtension;
            const filePath = path.resolve(__dirname, '..', 'static', fileName);
            await img.mv(filePath);
            const category = await Categories.create({ img: fileName, name })

            if (!category) {
                return next(ApiError.badRequest("Проверьте правильность заполнения всех полей"))
            }
            return res.json(category);
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
    async getAll(req, res, next) {
        try {
            const category = await Categories.findAll();
            if (!category) {
                return next(ApiError.badRequest("Категории не найдена"))
            }
            return res.json(category)
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.badRequest('Не указан id категории'));
            }
            const category = await Categories.findOne({ where: { id } })
            if (!category) {
                return next(ApiError.badRequest("Категория не найдена"))
            }
            return res.json(category)
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
    async deleteOne(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.badRequest('Не указан id категории'));
            }
            const category = await Categories.findOne({ where: { id } });
            if (!category) {
                return next(ApiError.notFound('Категория не найдена'));
            }
            await Categories.destroy({ where: { id } });
            return res.json({ message: 'Категория успешно удалена' })
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const { img } = req.files;

            const category = await Categories.findOne({ where: { id } });
            if (!category) {
                return next(ApiError.notFound('Категория не найдена'));
            }

            if (!name && !img) {
                return next(ApiError.badRequest('Не указаны данные для обновления'));
            }

            if (name) {
                category.name = name;
            }

            if (img) {
                const mimeType = mime.lookup(img.name);
                if (!mimeType.startsWith('image/')) {
                    return next(ApiError.badRequest('Пожалуйста, загрузите изображение'));
                }
                const fileExtension = img.name.split('.').pop();
                const fileName = uuid.v4() + "." + fileExtension;
                const filePath = path.resolve(__dirname, '..', 'static', fileName);
                await img.mv(filePath);
                category.img = fileName;
            }

            await category.save();

            return res.json(category);
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }
}

module.exports = new CategoryController()