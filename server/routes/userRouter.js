const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration',userController.registration)
router.post('/login',userController.login)
// router.get('/auth',authMiddleware, userController.check)
router.get('/profile', userController.profile)
router.post('/logout', userController.logout);
router.put('/edit', userController.editProfile);
router.get('/check', userController.check);

module.exports = router