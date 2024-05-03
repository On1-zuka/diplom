const Router = require('express');
const router = Router()
const categoryController = require('../controllers/categoryController')


router.post('/', categoryController.create)
router.get('/', categoryController.getAll)
router.get('/:id', categoryController.getOne)
router.delete('/:id', categoryController.deleteOne)
router.patch('/:id', categoryController.update)

module.exports = router