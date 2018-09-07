'use strict'

const Sequelize = require('sequelize')
const db = require('../db')

const Ward = db.define('ward', {
  name: {
    type: Sequelize.STRING
  },
  area: {
    type: Sequelize.DECIMAL(13,4)
  },
  border: {
    type: Sequelize.DECIMAL(13,7)
  },
  geom: {
    type: Sequelize.GEOMETRY('MULTIPOLYGON')
  },
  count: {
    type: Sequelize.INTEGER
  }
})

Ward.prototype.aggregateList = function () {
  return db.query(`
    SELECT
    crime_data."ID",
    crime_data."Date",
    crime_data."Block",
    crime_data."Primary Type",
    crime_data."Arrest",
    crime_data."Location"
    FROM wards, crime_data
    WHERE ST_Contains(wards.geom, crime_data."Location")
    AND wards.name = :wardName;`,
    { replacements: { wardName: this.name }, type: Sequelize.QueryTypes.SELECT }
  )
}

Ward.aggregateCount = async function () {
  const [allWardCounts, resultData] = await db.query(`
    SELECT
    count(crime_data."ID"),
    wards.name
    FROM wards, crime_data
    WHERE ST_Contains(wards.geom, crime_data."Location")
    GROUP BY wards.name;`,
    // { replacements: { wardName: this.name }, type: Sequelize.QueryTypes.SELECT }
  )
  let updatedWards = []
  for (let i = 0; i < 50; i++) {
    let [updatedRows, updatedWard] = await Ward.update({
      count: allWardCounts[i].count
    }, {
      where: {
        name: allWardCounts[i].name
      },
      returning: true
    })
    updatedWards.push(updatedWard)
  }
  return updatedWards
}

// Ward.getAllWards = async function () {
//   const allWards = await Ward.findAll()
//   for(let i = 0; i < allWards.length; i++) {
//     const count = await allWards[i].aggregateCount()
//     allWards[i].count = count
//   }
//   return allWards
// }

module.exports.Ward = Ward
