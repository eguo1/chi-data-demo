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

Neighborhood.aggregateCount = async function () {
  const [allNeighborhoodCounts, resultData] = await db.query(`
    SELECT
    count(crime_data."ID"),
    neighborhoods.name
    FROM neighborhoods, crime_data
    WHERE ST_Contains(neighborhoods.geom, crime_data."Location")
    GROUP BY neighborhoods.name;`
  )
  let updatedNeighborhoods = []
  if (allNeighborhoodCounts.length) {
    for (let i = 0; i < allNeighborhoodCounts.length; i++) {
      let [updatedRows, updatedNeighborhood] = await Neighborhood.update({
        count: allNeighborhoodCounts[i].count
      }, {
        where: {
          name: allNeighborhoodCounts[i].name
        },
        returning: true
      })
      updatedNeighborhoods.push(updatedNeighborhood)
    }
  }
  return updatedNeighborhoods
}

module.exports.Neighborhood = Neighborhood
