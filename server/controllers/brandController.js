const { Brands } = require('../models/models')
const ApiError = require('../error/ApiError');
const { where } = require('sequelize');
const uuid = require('uuid')
const path = require('path')
const mime = require('mime-types');
const fs = require('fs');

class BrandController {
    async create(req, res, next) {
        try {
            if (!req.files || !req.files.img) {
                return next(ApiError.badRequest('Изображение не было загружено'));
            }
            const { name } = req.body
            if (!name) {
                return next(ApiError.badRequest('Необходимо указать название бренда'));
            }
            const { img } = req.files
            const mimeType = mime.lookup(img.name);
            if (!mimeType.startsWith('image/')) {
                return next(ApiError.badRequest('Пожалуйста, загрузите изображение'));
            }
            const existingBrands = await Brands.findOne({ where: { name } });
            if (existingBrands) {
                return next(ApiError.badRequest('Бренды с таким названием уже существует'));
            }
            const fileExtension = img.name.split('.').pop();
            const fileName = uuid.v4() + "." + fileExtension;
            const filePath = path.resolve(__dirname, '..', 'static', fileName);
            await img.mv(filePath);
            const brands = await Brands.create({ img: fileName, name })
            if (!brands) {
                return next(ApiError.badRequest("Проверьте правильность заполнения всех полей"))
            }
            return res.json(brands);
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
    async getAll(req, res, next) {
        try {
            const brands = await Brands.findAll();
            if (brands.length === 0) {
                return res.status(404).json({ message: "Бренды не найдены" });
            }
            return res.json(brands);
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.badRequest('Не указан id бренда'));
            }
            const brands = await Brands.findOne({ where: { id } })
            if (!brands) {
                return next(ApiError.badRequest("Бренды не найдена"))
            }
            return res.json(brands)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.badRequest('Не указан id бренда'));
            }
            const brands = await Brands.findOne({ where: { id } })
            if (!brands) {
                return next(ApiError.badRequest("Бренды не найдена"))
            }
            await Brands.destroy({ where: { id } });
            return res.json({ message: 'Бренды успешно удалена' })
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const { img } = req.files || {};

            const brand = await Brands.findOne({ where: { id } });
            if (!brand) {
                return next(ApiError.notFound('Бренд не найден'));
            }

            if (name && name.trim().length === 0) {
                return next(ApiError.badRequest('Проверьте пробелы в названии'));
            }

            if (!name && !img) {
                return next(ApiError.badRequest('Не указаны данные для обновления'));
            }

            if (img) {
                const allowedExtensions = ['jpg', 'jpeg', 'png'];
                const fileExtension = img.name.split('.').pop().toLowerCase();
                if (!allowedExtensions.includes(fileExtension)) {
                    return next(ApiError.badRequest('Недопустимый тип файла. Разрешены только JPG, JPEG, PNG'));
                }

                if (brand.img) {
                    const oldFilePath = path.resolve(__dirname, '..', 'static', brand.img);
                    if (fs.existsSync(oldFilePath)) {
                        fs.unlinkSync(oldFilePath);
                    }
                }

                const fileName = uuid.v4() + "." + fileExtension;
                const filePath = path.resolve(__dirname, '..', 'static', fileName);
                try {
                    await img.mv(filePath);
                    brand.img = fileName;
                } catch (err) {
                    return next(ApiError.internal('Ошибка при сохранении нового изображения'));
                }
            }

            if (name) {
                brand.name = name;
            }

            await brand.save();
            return res.json(brand);
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }

}
module.exports = new BrandController()