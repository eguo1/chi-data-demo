'use strict'

const Sequelize = require('sequelize')
const db = require('../db')

const CrimeData = db.define('crime_data', {
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
  Neighborhood: {
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

CrimeData.filter = function (geomStr) {
  return db.query(`
    SELECT
    crime_data.id,
    crime_data."Date" as date,
    crime_data."Block" as block,
    crime_data."Primary Type" as type,
    crime_data."Arrest" as arrest,
    crime_data."Location" as location
    FROM crime_data
    WHERE ST_Contains(ST_Multi(ST_GeomFromText(:filterGeom)), crime_data."Location");`,
    { replacements: { filterGeom: geomStr }, type: Sequelize.QueryTypes.SELECT }
  )
}

module.exports.CrimeData = CrimeData
