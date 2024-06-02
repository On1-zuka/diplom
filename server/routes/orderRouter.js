const Router = require('express');
const router = Router()
const orderController = require('../controllers/orderController')

router.post('/create-order', orderController.fillingOrder);
router.get('/cart', orderController.fullOrder);

module.exports = router