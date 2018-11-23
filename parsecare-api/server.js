'use strict'

const debug = require('debug')('parsecare:api')
const http = require('http')
const chalk = require('chalk')
const express = require('express')
const asyncify = require('express-asyncify')
const cors = require('cors')

const api = require('./api')

const storage = require('./storage')

const port = process.env.PORT || 3000
const app = asyncify(express())
const server = http.createServer(app)


app.use('/api', api)
app.use('/storage', storage)

//Error Handler
app.use((err, req, res, next) => {
    debug(`Error: ${err.message}`)

    if(err.message.match(/not found/)) {
        return res.status(404).send({err: err.message})
    }

    res.status(500).send({err: err.message})
})

//Server Error Handler

function handleFatalError (err) {
    console.error(`${chalk.red('[fatal error]')} ${err.message}`)
    console.error(err.stack)
    process.exit(1)
}

if(!module.parent) {
    process.on('uncaughtException', handleFatalError)
    process.on('unhandledRejection', handleFatalError)

    server.listen(port, () => {
        console.log(`${chalk.green('[parsecare-api]')} server listening on port ${port}`)
    })
}

module.exports = server