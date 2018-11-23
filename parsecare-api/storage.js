'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const morgan = require('morgan')
const asyncify = require('express-asyncify')
const debug = require('debug')('parsecare:storage:routes')
const auth = require('./auth')

const db = require('parsecare-db')

const config = require('./config')

const storage = asyncify(express.Router())

let User, services

storage.use(morgan('dev'))
storage.use(bodyParser.json())

storage.use(bodyParser.urlencoded({extended: true}))
storage.use(cookieParser())

storage.use(session({
    key: 'user_sid',
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}))

storage.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

storage.use('*', async (req, res, next) => {
    if(!services) {
        debug('Conectando a la Base de Datos')
        try {
            services = await db(config.db)
        } catch (e) {
            return next(e)
        }
        User = services.User
    }
    next()
})



storage.get('/', async (req, res, next) => {
    res.redirect('storage/login')
})

storage.post('/login', async (req, res, next) => {
    debug('A request has come to /login ')
    const userReq = req.body
    debug(userReq)
    let user
    try {
        user = await User.findByEmail(userReq.correo)

        if(await user._modelOptions.instanceMethods.validPassword(userReq.password, user.password)) {
            debug('LOGIN SUCCESSFULL')
            req.session.user = user.dataValues
            auth.sign({id: user.id}, config.auth.secret, (err, token) => {
                if(!err) {
                    debug(`token: ${token}`)
                    return res.send({token: token, id: user.id} )
                } else {
                    return err
                }
            })
        } else {
            debug('CREDENCIALES INCORRECTAS')
            return res.send('CREDENTIALS INCORRECT')
        }
    } catch (e) {
        return next(e)
    }
})

module.exports = storage