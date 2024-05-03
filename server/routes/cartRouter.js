const Router = require('express');
const router = Router();
const basketController = require('../controllers/cartController');

router.post('/add',basketController.addToCart);
router.get('/', basketController.getCart);
router.delete('/remove', basketController.removeFromCart)
router.patch('/:cartId/update/:productId',basketController.updateItemCart)

module.exports = router