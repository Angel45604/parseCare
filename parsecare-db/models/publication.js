'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')
const debug = require('debug')('parsecare:db:publication')

module.exports = function setupPublicationModel (config) {
    const sequelize = setupDatabase(config)

    return sequelize.define('publicacione', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        contenido: {
            type: Sequelize.STRING,
            allowNull: false
        },

        topic: {
            type: Sequelize.STRING,
            allowNull: false
        },
        
        archivo: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
}