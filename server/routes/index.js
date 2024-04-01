const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')
const brandRouter = require('./brandRouter')
const productRouter = require('./productRouter')
const basketRouter = require('./basketRouter')


router.use('/users', userRouter)
router.use('/categories', categoryRouter)
 router.use('/brands', brandRouter)
// router.use('/products', productRouter)
// router.use('/basket', basketRouter)


module.exports = router