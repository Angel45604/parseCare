'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')
const debug = require('debug')('parsecare:db:cat_roles')

module.exports = function setupCatRolesModel (config) {
    const sequelize = setupDatabase(config)

    return sequelize.define('cat_roles', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        rol: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
}