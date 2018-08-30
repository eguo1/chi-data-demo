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
  geom: {
    type: Sequelize.GEOMETRY('MULTIPOLYGON')
  }
})

const aggregateQuery =
  `SELECT
  crime_data."ID",
  crime_data."Date",
  crime_data."Block",
  crime_data."Primary Type",
  crime_data."Arrest",
  crime_data."Location"
  FROM wards, crime_data
  WHERE ST_Contains(wards.geom, crime_data."Location")
  AND wards.name = :wardName;`

Ward.prototype.aggregateList = function () {
  return db.query(
    aggregateQuery,
    { replacements: { wardName: this.name }, type: Sequelize.QueryTypes.SELECT }
  )
}

Ward.prototype.aggregateCount = async function () {
  const allPoints = await db.query(
    aggregateQuery,
    { replacements: { wardName: this.name }, type: Sequelize.QueryTypes.SELECT }
  )
  return allPoints.length
}

module.exports.Ward = Ward
