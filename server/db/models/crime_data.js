'use strict'

const Sequelize = require('sequelize')
const db = require('../db')

const ImportData = db.define('crime_data', {
  'Case Number': {
    type: Sequelize.STRING,
  },
  ID: {
    type: Sequelize.INTEGER,
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
    type: Sequelize.STRING,
  },
  Ward: {
    type: Sequelize.STRING,
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
    type: Sequelize.GEOMETRY('POINT'),
  }
}, {
  hooks: {
    beforeValidate: crimeData => {
      const convertedLocation =
        crimeData.Location.replace('(', '').replace(')', '').split(',').reverse()
      crimeData.Location = { type: 'Point', coordinates: convertedLocation }
    }
  }
})

module.exports.ImportData = ImportData
