'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')
const debug = require('debug')('parsecare:db:comment')

module.exports = function setupPublicationModel (config) {
    const sequelize = setupDatabase(config)

    return sequelize.define('comment', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        comentario: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
}