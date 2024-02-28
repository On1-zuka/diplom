const { Category } = require('../models/models')
const ApiError = require('../error/ApiError')

class CategoryController {
    async create(req, res, next) {

        try {
            const { name, img } = req.body;
            const category = await Category.create({ name, img });
            if (!category) {
                return next(ApiError.badRequest("Check all fields for correct input"))
            }
            return res.json(category);
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }

    }
    async getAll(req, res, next) {
        try {
            const category = await Category.findAll();
            if (!category) {
                return next(ApiError.badRequest("No category found"))
            }
            return res.json(category)
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const category = await Category.findOne({
                where: { id }
            })
            if (!category) {
                return next(ApiError.badRequest("No category found"))
            }
            return res.json(category)
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }


    }
}
module.exports = new CategoryController()