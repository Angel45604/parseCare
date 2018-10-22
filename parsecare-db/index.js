'use strict'

const setupDatabase = require('./lib/db')
const setupUserModel = require('./models/user')

const setupUser = require('./lib/user')


module.exports = async function (config) {
    const sequelize = setupDatabase(config)

    const UserModel =  setupUserModel(config)

    await sequelize.authenticate()

    if(config.setup) {
        await sequelize.sync({ force: true })
    }

    const User = setupUser(UserModel)

    return {
        User
    }
}