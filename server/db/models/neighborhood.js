'use strict'

const Sequelize = require('sequelize')
const db = require('../db')

const Neighborhood = db.define('neighborhood', {
  name: {
    type: Sequelize.STRING
  },
  area: {
    type: Sequelize.DECIMAL(13,4)
  },
  border: {
    type: Sequelize.DECIMAL(12,6)
  },
  geom: {
    type: Sequelize.GEOMETRY('MULTIPOLYGON')
  },
  count: {
    type: Sequelize.INTEGER
  }
})

module.exports.Neighborhood = Neighborhood
