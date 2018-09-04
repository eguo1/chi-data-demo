'use strict'

const router = require('express').Router()
const fetchAllNeighborhoods = require('../services/neighborhood-data')
const { Neighborhood } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allNeighborhoods = await Neighborhood.findAll({
      attributes: [
        'name', 'count', 'area', 'border', 'geom'
      ]
    })
    res.json(allNeighborhoods)
  } catch (err) {
    next(err)
  }
})

router.get('/fetch', async (req, res, next) => {
  try {
    await fetchAllNeighborhoods()
    const neighborhoodData = await Neighborhood.aggregateCount()
    res.json(neighborhoodData)
  } catch (err) {
    next(err)
  }
})

router.get('/update', async (req, res, next) => {
  try {
    const updatedData = await Neighborhood.aggregateCount()
    res.json(updatedData)
  } catch (err) {
    next(err)
  }
})
