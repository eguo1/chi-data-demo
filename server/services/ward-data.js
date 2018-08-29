'use strict'

const axios = require('axios')
const { Ward } = require('../db/models')

const individualFetch = async (wardNum) => {
  const { data } = await axios.get(`http://boundaries.tribapps.com/1.0/boundary-set/wards/${wardNum}`)
  return Ward.create({
    name: data.name,
    centroid: data.centroid,
    geoShape: data.simple_shape
  })
}

const fetchAllWards = async () => {
  for (let i = 1; i < 51; i++) {
    await individualFetch(i)
  }
}

module.exports = fetchAllWards
