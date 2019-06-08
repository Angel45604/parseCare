'use strict'

const debug = require('debug')('parsecare:api:routes')
const express = require('express')
const asyncify = require('express-asyncify')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const db = require('parsecare-db')

const config = require('./config')

const api = asyncify(express.Router())

api.use(morgan('dev'))

api.use(bodyParser.urlencoded({extended: true}))
api.use(bodyParser.json())

let services, User, Comment, Publication, Role

api.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

api.use('*', async (req, res, next) => {
    if (!services) {
        debug('Conectando a la Base de Datos')
        try {
            services = await db(config.db)
        } catch (e) {
            return next(e)
        }

        User = services.User
        Publication = services.Publication
        Role = services.Role
        Comment = services.Comment
    }
    next()
})


//RELACIONES
api.get('/ola', async(req, res, next) => {
    debug('A request has come to /ola')

    try {
         await Role.findAll().then(roles=> {
             let rol = roles[0]
             rol.createUsuario({
                 nombre: 'NOMBRE DE LOS MEMAZOS',
                 apellidos: 'Cruz MEMAZOS',
                 nickname: 'MEMAZOS',
                 correo: 'f.f@f.f',
                 password: 'megustanlosmemes5',
             }).then(usuario => {
                 res.send(usuario)

             }, err => {
                 console.log(err)
             })

        }, err => {
             console.error(err)
         })
    } catch (e) {
        return next(e)
    }


})

api.get('/adios', async (req, res, next) => {
    debug('A request has come to /adios')

    res.send({mensaje: 'Adios'})
})

api.get('/roles', async (req, res, next) => {
    debug('A request has come to /roles')

    let roles = []

    try {
        roles = await Role.findAll()

    } catch(e) {
        return next(e)
    }
    res.send(roles)
})

api.get('/users', async (req, res, next) => {
    debug('A request has come to /users')
    let users = []

    try {
        users = await User.findAll()
    } catch(e) {
        return next(e)
    }
    res.send(users)
})
api.get('/publication', async (req, res, next) => {
    debug(`A request has come to /publication/`)

    let publication = []

    try {
        publication = await Publication.findAll()
    } catch(e) {
        return next(e)
    }
    res.send(publication)
})
api.get('/comment', async (req, res, next) => {
    debug(`A request has come to /comment/`)

    let comment = []

    try {
        comment = await Comment.findAll()
    } catch(e) {
        return next(e)
    }
    res.send(comment)
})
api.get('/users/:nickname', async (req, res, next) => {
    debug(`A request has come to /users/${req.params.nickname}`)

    let nickname = req.params.nickname
    let users = []
    try {
        users = await User.findByNickName(nickname)
    } catch(e) {
        return next(e)
    }

    res.send(users)
})

api.post('/users', async (req, res, next) => {
    debug(`A request has come to /users POST`)
    let user = {
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        nickname: req.body.nickname,
        password: req.body.password,
        correo: req.body.correo,
        //rolId: req.body.rolId
    }
    debug(user)
    try {
        await User.createOrUpdate(user)
    } catch(e) {
        return next(e)
    }
    res.send(user)
})


api.post('/publication', async (req, res, next) => {
    debug(`A request has come to /publication POST`)

    let publication = req.body
    debug(req.body)

    try {
        User.findById(req.body.user.id).then(usr => {
            debug('USUARIO', usr)
            usr.createPublicacione(req.body).then(pub => {
                debug('PUBLICACION', pub)
                res.send(publication)
            })
        })
    } catch(e) {
        return next(e)
    }

})

api.post('/comment', async (req, res, next) => {
    debug(`A request has come to /comment POST`)

    let comment = req.body
    debug(comment)

    try {
        User.findById(req.body.user.id).then(usr => {
            debug('USUARIO', usr)
            usr.createComment(req.body).then(com => {
                debug('COMENTARIO', com)
                Publication.findById(req.body.publicationId).then(pub => {
                    
                })
            })
        })
    } catch(e) {
        return next(e)
    }
})


api.delete('/users/', async (req, res, next) => {
    debug('A request has come to /users DELETE')

    let correo = req.body.correo
    try {
        await User.deleteUser(correo)
    } catch(e) {
        return next(e)
    }
    res.send(`Se elmino el usuario con correo ${correo}`)
})

module.exports = api