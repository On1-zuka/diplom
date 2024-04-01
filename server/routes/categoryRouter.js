const Router = require('express');
const router = Router()
const categoryController = require('../controllers/categoryController')
//const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', categoryController.create)//checkRole('ADMIN'),
router.get('/', categoryController.getAll)
router.get('/:id', categoryController.getOne)
router.delete('/:id', categoryController.deleteOne)
router.patch('/:id', categoryController.update)

module.exports = router