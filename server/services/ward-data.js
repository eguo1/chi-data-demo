'use strict'

const ordinal = require('ordinal')
const axios = require('axios')
const { Ward } = require('../db/models')

const fetchAllWards = async () => {
  const { data } = await axios.get('https://data.cityofchicago.org/resource/k9yb-bpqx.json')
  const allWards = []
  for (let i = 0; i < data.length; i++) {
    const ward = await Ward.findOrCreate({
      where: {
        name: ordinal(+data[i].ward).toString()
      },
      defaults: {
        area: data[i].shape_area,
        border: data[i].shape_leng,
        geom: data[i].the_geom
      }
    })
    allWards.push(ward)
  }
  return allWards
}

module.exports = fetchAllWards
