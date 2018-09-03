'use strict'

const axios = require('axios')
const { Ward } = require('../db/models')

const individualFetch = async (wardNum) => {
  const { data } = await axios.get(`http://boundaries.tribapps.com/1.0/boundary-set/wards/${wardNum}`)
  const [ward, _createdBool] = await Ward.findOrCreate({
    where: {
      name: data.name.slice(0,-2),
    },
    defaults: {
      centroid: data.centroid,
      geom: data.simple_shape
    }
  })
  return ward
}

const fetchAllWards = async () => {
  const wardArr = []
  for (let i = 1; i < 51; i++) {
    const individualWard = await individualFetch(i)
    const { name, centroid, geom } = individualWard
    wardArr.push({
      [name]: {
        centroid, geom
      }
    })
  }
  return wardArr
}

module.exports = fetchAllWards
