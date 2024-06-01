const {Collection, CollectionItem, ColPrev, Picture} = require('../models/models');

class CollectionController {
    async create(req, res, next) {
        try {
            let {name, userUserID} = req.body
            let prev = ''
            let amount = 0
            const collection = await Collection.create({name, userUserID, prev, amount})
            return res.json(collection)
        } catch (e) {
            console.log(e)
        }
    }

    async add(req, res) {
        try {
            let {collectionCollectionID, picturePictureID} = req.body
            const colItem = await CollectionItem.create({collectionCollectionID, picturePictureID})
            let items = await CollectionItem.findAndCountAll({where: {collectionCollectionID}})
            let amount = items.count
            let collectionID = collectionCollectionID
            const collection = await Collection.update({amount: amount}, {where: {collectionID}})
            let pictureID = picturePictureID
            let prevPic = await Picture.findOne({where: {pictureID}})
            let preview = prevPic.file.toString()
            const prev = await Collection.update({preview: preview}, {where: {collectionID}})
            return res.json(colItem)
        } catch (e) {
            console.log(e)
        }
    }

    async getAll(req, res) {
        const collections = await Collection.findAll()
        return res.json(collections)
    }

    async viewOne(req, res) {
        const {id} = req.params
        let collectionID = id
        const collection = await Collection.findOne({where: {collectionID}})
        let collectionCollectionID = id
        let colItems = await CollectionItem.findAll({where: {collectionCollectionID}})
        let picIds = []
        let colPics = []
        colItems.map(colItem=> picIds.push(colItem.picturePictureID))
        picIds.map(async picId => {
            let pictureID = picId
            let e = await Picture.findOne({where: {pictureID}})
            colPics.push(e.dataValues)
            if (colPics.length === picIds.length){
                return res.json(colPics)
            }
        })
    }

}

module.exports = new CollectionController()