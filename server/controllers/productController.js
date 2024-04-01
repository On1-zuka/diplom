const { Product, ProductInfo } = require('../models/models')
const ApiError = require("../error/ApiError")
const uuid = require('uuid')
const path = require('path')

class ProductController {
    async create(req, res, next) {
        try {
            let { name, price, rating, categoryId, brandId, info } = req.body
            let { img } = req.files
            let fileExtension = img.name.split('.').pop();
            let fileName = uuid.v4() + "." + fileExtension;
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const product = await Product.create({ img: fileName, name, price, categoryId, brandId })
            if(info){
                info = JSON.parse(info);
                info.array.forEach(i => {
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        discount:i.discount,
                        availability: i.availability,
                        productId: product.id
                    })
                });
            }
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
            let { brandId, categoryId, limit, page } = req.query;
            page = page || 1
            limit = limit || 9 
            let offset = page * limit - limit
            let product;
            if (!brandId && !categoryId) {
                product = await Product.findAndCountAll({limit, offset})
            } else if (brandId && !categoryId) {
                product = await Product.findAndCountAll({ where: { brandId }, limit, offset })
            } else
                if (!brandId && categoryId) {
                    product = await Product.findAndCountAll({ where: { categoryId }, limit, offset })
                } else
                    if (brandId && categoryId) {
                        product = await Product.findAndCountAll({ where: { categoryId, brandId }, limit, offset })
                    }
            return res.json(product)
        }
        catch (e) {
            return next(ApiError.badRequest("Ошибка сервера"))
        }
    }
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const product = await Product.findOne({
                where: { id },
                include: [{model:ProductInfo, as:'info'}]
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
