const Router = require('express');
const router = Router();
const basketController = require('../controllers/cartController');

router.post('/add',basketController.addToCart);
router.get('/', basketController.getCart);
router.delete('/remove/:productId', basketController.removeFromCart)
router.patch('/update/:productId',basketController.updateItemCart)

module.exports = router