const {Theme} = require('../models/models');

class ThemeController {
    async create(req, res) {
        const {name} = req.body
        let amount = 0
        const theme = await Theme.create({name, amount})
        return res.json(theme)
    }

    async getAll(req, res) {
        const themes = await Theme.findAll()
        return res.json(themes)
    }

}

module.exports = new ThemeController()