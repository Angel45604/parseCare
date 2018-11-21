'use strict'

const setupDatabase = require('./lib/db')
const setupUserModel = require('./models/user')
const setupCatRoleModel = require('./models/cat_roles')
const setupCommentModel = require('./models/comment')
const setupPublicationModel = require('./models/publication')

const setupUser = require('./lib/user')
const setupCatRole = require('./lib/cat_roles')
const setupComment = require('./lib/comment')
const setupPublication = require('./lib/publication')


module.exports = async function (config) {
    const sequelize = setupDatabase(config)

    const UserModel =  setupUserModel(config)
    const CatRoleModel = setupCatRoleModel(config)
    const CommentModel = setupCommentModel(config)
    const PublicationModel = setupPublicationModel(config)


    //usuario-rol 1:n usuario.rolId
    CatRoleModel.hasMany(UserModel, {
        foreignKey: 'rolId',
        constraints: true
    });

    UserModel.belongsTo(CatRoleModel, {
        foreignKey: 'rolId',
        constraints: true,
        as: 'rol'
    });
    //publication-usuario 1:n publication.usuarioId
    UserModel.hasMany(PublicationModel, {
        foreignKey: 'usuarioId',
        constraints: true
    });
    PublicationModel.belongsTo(UserModel, {
        foreignKey: 'usuarioId',
        constraints: true,
        as: 'user'
    });
    //comment-usuario 1:n comment.usuarioId
    UserModel.hasMany(CommentModel, {
        foreignKey: 'usuarioId',
        constraints: true
    });
    CommentModel.belongsTo(UserModel, {
        foreignKey: 'usuarioId',
        constraints: true,
        as: 'user'
    });
    //comment-publication 1:n comment.publicationId
    PublicationModel.hasMany(CommentModel, {
        foreignKey: 'publicationId',
        constraints: true
    });
    CommentModel.belongsTo(PublicationModel, {
        foreignKey: 'publicationId',
        constraints: true,
        as: 'publication'
    });
    
    CatRoleModel.bulkCreate([
        {rol: 'Usuario'},
        {rol: 'Administrador'}
    ])

    CommentModel.bulkCreate([
        {comentario: 'comentario1'},
        {comentario: 'comentario2'}
    ])

    UserModel.bulkCreate([
        { nombre: 'Angel', apellidos: 'Marcos Montes', nickname: 'Angelito123', correo: 'a.a@a.a', password: 'megustanlosmemes', rolId: 1},
        { nombre: 'Oscar', apellidos: 'Gutierres Zorra', nickname: 'urielox1', correo: 'b.b@b.b', password: 'megustanlosmemes1', rolId: 1},
        { nombre: 'Uriel', apellidos: 'Garcia del Oso', nickname: 'urielox2', correo: 'c.c@c.c', password: 'megustanlosmemes2', rolId: 1},
        { nombre: 'Gerardo', apellidos: 'Ponce Ortega', nickname: 'geponceo', correo: 'd.d@d.d', password: 'megustanlosmemes3', rolId: 2},
        { nombre: 'Juan Manuel', apellidos: 'Cruz Mendoza', nickname: 'Pollo', correo: 'e.e@e.e', password: 'megustanlosmemes4', rolId: 2}
    ])
    PublicationModel.bulkCreate([
        {contenido: 'AngelFDFFS', topic: 'INFO 1', archivo: 'tugfa.exe', usuarioId: 1},
        {contenido: 'AngelADFHGHJ', topic: 'INFO 2', archivo: 'Angelito123.html', usuarioId: 2},
        {contenido: 'AngelHJKKLUIURTFB', topic: 'INFO 3', archivo: 'Angelito123', usuarioId: 3}
    ])

    await sequelize.authenticate()

    if(config.setup) {
        await sequelize.sync({ force: true })
    }

    const User = setupUser(UserModel, CatRoleModel)
    const Role = setupCatRole(CatRoleModel)
    const Comment = setupComment(CommentModel, UserModel, PublicationModel)
    const Publication = setupPublication(PublicationModel, UserModel, CommentModel)

    return {
        User,
        Role,
        Publication,
        Comment
    }
}