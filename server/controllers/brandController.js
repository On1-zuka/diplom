const { Brand } = require('../models/models')
const ApiError = require('../error/ApiError')

class BrandController {
    async create(req, res, next) {
        try {
            const { name, img } = req.body
            const brand = await Brand.create({ name, img })
            if (!brand) {
                return next(ApiError.badRequest("Check all fields for correct input"))
            }
            return res.json(brand)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res) {
        try {
            const brand = await Brand.findAll();
            if (!brand) {
                return next(ApiError.badRequest("No brands found"))
            }
            return res.json(brand)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
    async getOne(req, res) {
        try {
            const { id } = req.params;
            const brand = await Brand.findOne({
                where: { id }
            })
            if (!brand) {
                return next(ApiError.badRequest("No brands found"))
            }
            return res.json(brand)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
}
module.exports = new BrandController()