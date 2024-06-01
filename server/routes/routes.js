const Router = require('express');
const router = new Router()
const userRouter = require('./userRouter');
const roleRouter = require('./roleRouter');
const themeRouter = require('./themeRouter');
const pictureRouter = require('./pictureRouter');
const commentRouter = require('./commentRouter');
const collectionRouter = require('./collectionRouter');

router.use('/user', userRouter)
router.use('/role', roleRouter)
router.use('/theme', themeRouter)
router.use('/picture', pictureRouter)
router.use('/comment', commentRouter)
router.use('/collection', collectionRouter)

module.exports = router
