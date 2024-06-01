const uuid = require('uuid')
const path = require('path');
const {Picture, Theme} = require('../models/models');
const ApiError = require('../error/ApiError');
const { where } = require('sequelize');

class PictureController {
    async create(req, res, next) {
        try {
            const {file} = req.files
            const {name, tags, source, userUserID, themeThemeID} = req.body
            let fileName = uuid.v4() + ".jpg"
            file.mv(path.resolve(__dirname, '..', 'static', fileName))
            const picture = await Picture.create({file: fileName, name, tags, source, userUserID, themeThemeID})
            let picAmount = await Picture.findAndCountAll({where: {themeThemeID}})
            let amount = picAmount.count
            let themeID = themeThemeID
            const theme = await Theme.update({amount: amount}, {where: {themeID}})
            return res.json(picture)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let pictures;

        pictures = await Picture.findAll()

        return res.json(pictures)
    }

    async getOne(req, res) {
        const {id} = req.params
        const pictureID = id
        const picture = await Picture.findOne({where: {pictureID}})
        return res.json(picture)
    }

    async getThemed(req, res) {
        const {themeThemeID} = req.params

        const pictures = await Picture.findAll({where:{themeThemeID}})

        return res.json(pictures)
    }
}

module.exports = new PictureController()