const Router = require('express');
const productController = require("../controllers/productController")
const router = new Router()

router.post('/', productController.create);
router.get('/', productController.getAll);
router.get('/search', productController.search);
router.get('/:id', productController.getOne);
router.delete('/:id',productController.deleteOne);
router.patch('/:id', productController.update);


module.exports = router