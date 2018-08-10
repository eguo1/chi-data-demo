'use strict'

const Sequelize = require('sequelize')
const db = require('../db')

const ImportData = db.define('import_data', {
  'Case Number': {
    type: Sequelize.STRING,
    unique: true
  },
  ID: {
    type: Sequelize.INTEGER,
    unique: true
  },
  Date: {
    type: Sequelize.DATE,
  },
  Block: {
    type: Sequelize.STRING,
  },
  IUCR: {
    type: Sequelize.STRING,
  },
  'Primary Type': {
    type: Sequelize.STRING,
  },
  Description: {
    type: Sequelize.STRING,
  },
  'Location Description': {
    type: Sequelize.STRING,
  },
  Arrest: {
    type: Sequelize.BOOLEAN,
  },
  Domestic: {
    type: Sequelize.BOOLEAN,
  },
  Beat: {
    type: Sequelize.INTEGER,
  },
  Ward: {
    type: Sequelize.INTEGER,
  },
  'FBI Code': {
    type: Sequelize.STRING,
  },
  'X Coordinate': {
    type: Sequelize.INTEGER,
  },
  'Y Coordinate': {
    type: Sequelize.INTEGER,
  },
  Year: {
    type: Sequelize.INTEGER,
  },
  Latitude: {
    type: Sequelize.FLOAT,
  },
  Longitude: {
    type: Sequelize.FLOAT,
  },
  Location: {
    type: Sequelize.GEOMETRY('POINT')
  }
})

module.exports = ImportData
