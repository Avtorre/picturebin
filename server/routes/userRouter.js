const Router = require('express');
const router = new Router()
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/load/:userID', userController.load)
router.get('/load/e/:email', userController.loadE)

module.exports = router