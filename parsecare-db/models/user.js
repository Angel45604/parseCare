'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')
const debug = require('debug')('parsecare:db:user')

module.exports = function setupUserModel (config) {
    const sequelize = setupDatabase(config)

    return sequelize.define('usuario', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },

        apellidos: {
            type: Sequelize.STRING,
            allowNull: false
        },
        
        nickname: {
            type: Sequelize.STRING,
            allowNull: false
        },

        correo: {
            type: Sequelize.STRING,
            allowNull: false
        },

        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
}