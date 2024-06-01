const ApiError = require('../error/ApiError');
const {Comment} = require('../models/models');

class CommentController {
    async create(req, res, next) {
        try {
            let {text, userUserID, picturePictureID, userName} = req.body
            const comment = await Comment.create({text, userUserID, picturePictureID, userName})
            return res.json(comment)
        } catch (e) {
            console.log(e)
        }
    }

    async getAll(req, res) {
        const {picturePictureID} = req.params
        const comments = await Comment.findAll({where: {picturePictureID}})
        return res.json(comments)
    }
}

module.exports = new CommentController()