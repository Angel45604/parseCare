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

api.get('/ola', async(req, res, next) => {
    debug('A request has come to /ola')

    res.send({mensaje: 'Ola de mar'})

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