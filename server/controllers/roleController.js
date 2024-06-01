const ApiError = require('../error/ApiError');
const {Role} = require('../models/models');

class RoleController {
    async create(req, res, next) {
        try {
            let {role, accessLevel} = req.body
            const r = await Role.create({role, accessLevel})
            return res.json(r)
        } catch (e) {
            console.log(e)
        }
    }
    
    async getAll(req, res) {
        const roles = await Role.findAll()
        return res.json(roles)
    }
}

module.exports = new RoleController()