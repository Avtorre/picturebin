const Router = require('express');
const router = new Router()
const collectionController = require('../controllers/collectionController')

router.post('/', collectionController.create)
router.post('/add', collectionController.add)
router.get('/', collectionController.getAll)
router.get('/:id', collectionController.viewOne)

module.exports = router