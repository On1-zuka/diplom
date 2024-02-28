const Router = require('express');
const productController = require("../controllers/productController")
const router = new Router()

router.post('/', productController.create)// для создания бренда
router.get('/', productController.getAll)// для получения бренда
router.get('/:id', productController.getOne)
router.delete('/:id')

module.exports = router