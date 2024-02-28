const { Product } = require('../models/models')
const ApiError = require("../error/ApiError")
const uuid = require('uuid')
const path = require('path')

class ProductController {
    async create(req, res, next) {
        try {
            const { name, price, rating, categoryId, brandId } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..','static', fileName))

            const product = await Product.create({ img: fileName, name, price, categoryId, brandId })
            if (!product) {
                return next(ApiError.badRequest("Check all fields for correct input"))
            }
            if (product) {
                return res.json(product)
            }
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }

    }
    async getAll(req, res, next) {
        try {
            const product = await Product.findAll();
            if (!product) {
                return next(ApiError.badRequest("Товары не найдены"))
            }
            if (product) {
                return res.json(product);
            }

        }
        catch (e) {
            return next(ApiError.badRequest("Ошибка сервера"))
        }
    }
    async getOne(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.findOne({
                where: { id }
            })
            if (!product) {
                return next(ApiError.badRequest("Товар не найден"))
            }
            if (product) {
                return res.json(product)
            }
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
}
module.exports = new ProductController()