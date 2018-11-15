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

let services, User, Publication, Role

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

    let users = []

    try {
        users = await User.findAll()
    } catch(e) {
        return next(e)
    }
    res.send(users)
})
api.get('/publication', async (req, res, next) => {
    debug(`A request has come to /publication/${req.params.nickname}`)

    let publication = []

    try {
        publication = await Publication.findAll()
    } catch(e) {
        return next(e)
    }
    res.send(publication)
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
        rolId: req.body.rolId
    }

    try {
        await User.createOrUpdate(user)
    } catch(e) {
        return next(e)
    }
    res.send(user)
})
api.post('/publication', async (req, res, next) => {
    debug(`A request has come to /publication POST`)

    let publication = {
        contenido: req.body.contenido,
        topic: req.body.topic,
        archivo: req.body.archivo,
        usuarioId: req.body.usuarioId
    }

    try {
        await Publication.createOrUpdate(publication)
    } catch(e) {
        return next(e)
    }
    res.send(publication)
})

api.post('/publications/comment', async (req, res, next) => {
    debug(`A request has come to /publications/comment POST`)

    let comment = {
        comentario: req.body.comentario
    }

    try {
        await Publication.insertComment(comment)
    } catch(e) {
        return next(e)
    }
    res.send(comment)
})


api.delete('/users', async (req, res, next) => {
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