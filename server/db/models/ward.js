'use strict'

const Sequelize = require('sequelize')
const db = require('../db')

const Ward = db.define('ward', {
  name: {
    type: Sequelize.STRING,
  },
  centroid: {
    type: Sequelize.GEOMETRY('POINT')
  },
  geoShape: {
    type: Sequelize.GEOMETRY('MULTIPOLYGON')
  }
})

module.exports.Ward = Ward
