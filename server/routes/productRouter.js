const Router = require('express');
const productController = require("../controllers/productController")
const router = new Router()

router.post('/', productController.create);
router.get('/', productController.getAll);
router.get('/max-price', productController.getMaxPriceProduct);
router.get('/search', productController.search);
router.get('/:id', productController.getOne);
router.delete('/:id',productController.deleteOne);
router.patch('/:id', productController.update);
router.get('byBrand/:brandId', productController.getProductsByBrand);

module.exports = router