const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, Role, Token} = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id: id, email, role}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'} 
    )
}
 
class UserController {
    async registration(req, res, next) {
        const {userName, email, password, roleRoleID} = req.body
        if (!email || !password){
            return next(ApiError.badRequest('Invalid email or password'))
        }

        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('This email has been already used'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({userName, email, password: hashPassword, roleRoleID})
        let roleID = roleRoleID
        const role = await Role.findOne({where: {roleID}})
        const token = generateJwt(user.userID, user.email, role.role)
        let tokenType = 'regToken'
        let userUserID = user.userID
        const t = await Token.create({token, tokenType, userUserID})
        return(res.json({token}))
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})

        if (!user) {
            return next(ApiError.internal('No users with such email were found'))
        }

        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Incorrect password'))
        }
        let userUserID = user.userID
        let ut = await Token.findOne({where: {userUserID}}) 
        let roleID = user.roleRoleID
        let role = await Role.findOne({where: {roleID}})
        const tokenj = generateJwt(user.userID, user.email, role.role)
        let tokenID = ut.tokenID
        const t = await Token.update({token : tokenj, tokenType: 'logToken'},{where: {tokenID}})
        return res.json({tokenj}) 
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        let userUserID = req.user.id
        let ut = await Token.findOne({where: {userUserID}}) 
        let tokenID = ut.tokenID
        const t = await Token.update({token : token, tokenType: 'authToken'},{where: {tokenID}})
        return res.json({token})
    }

    async load(req, res) {
        const {userID} = req.params
        const user = await User.findOne({where: {userID}})
        return res.json({user})
    }

    async loadE(req, res) {
        const {email} = req.params
        const user = await User.findOne({where: {email}})
        return res.json({user})
    }
}

module.exports = new UserController()