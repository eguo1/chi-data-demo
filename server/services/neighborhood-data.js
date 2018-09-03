'use strict'

const axios = require('axios')
const { Neighborhood } = require('../db/models')

const fetchAllNeighborhoods = async () => {
  const { data } = await axios.get('https://data.cityofchicago.org/resource/y6yq-dbs2.json')
  let allNeighborhoods = []
  for (let i = 0; i < data.length; i++) {
    const [neighborhood, _createdBool] = await Neighborhood.findOrCreate({
      where: {
        name: data[i].pri_neigh
      },
      defaults: {
        area: data[i].shape_area,
        border: data[i].shape_len,
        geom: data[i].the_geom,
      }
    })
    allNeighborhoods.push(neighborhood)
  }
  return allNeighborhoods
}

module.exports = fetchAllNeighborhoods
