const sequelize = require('../db');
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    userID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userName: {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    createdAt:{type: DataTypes.DATE},
})

const Token = sequelize.define('token', {
    tokenID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    token: {type: DataTypes.STRING},
    tokenType: {type:  DataTypes.STRING},
    validUntil: {type: DataTypes.DATE},
})

const Role = sequelize.define('role', {
    roleID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    role: {type: DataTypes.STRING},
    accessLevel: {type: DataTypes.INTEGER},
})

const Picture = sequelize.define('picture', {
    pictureID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    file: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING},
    tags: {type: DataTypes.STRING},
    source: {type: DataTypes.STRING},
})

const Theme = sequelize.define('theme', {
    themeID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
    amount: {type: DataTypes.INTEGER},
})

const Comment = sequelize.define('comment', {
    commentID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING},
    createdAt:{type: DataTypes.DATE},
    userName:{type: DataTypes.STRING},
})

const Collection = sequelize.define('collection', {
    collectionID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    amount: {type: DataTypes.INTEGER},
    preview: {type: DataTypes.STRING},
    createdAt:{type: DataTypes.DATE},
})

const CollectionItem = sequelize.define('collectionItem', {
    itemID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasMany(Token)
Token.belongsTo(User)

Role.hasMany(User)
User.belongsTo(Role)

User.hasMany(Collection)
Collection.belongsTo(User)

User.hasMany(Comment)
Comment.belongsTo(User)

User.hasMany(Picture)
Picture.belongsTo(User)

Theme.hasMany(Picture)
Picture.belongsTo(Theme)

Collection.belongsToMany(Picture, {through: CollectionItem})
Picture.belongsToMany(Collection, {through: CollectionItem})

Picture.hasMany(Comment)
Comment.belongsTo(Picture)

module.exports = {
    User,
    Token,
    Role,
    Picture,
    Theme,
    Collection,
    CollectionItem,
    Comment,
}
