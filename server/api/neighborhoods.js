'use strict'

const router = require('express').Router()
const fetchAllNeighborhoods = require('../services/neighborhood-data')
const { Neighborhood } = require('../db/models')
module.exports = router

router.get('/fetch', async (req, res, next) => {
  try {
    const neighborhoodData = await fetchAllNeighborhoods()
    res.json(neighborhoodData)
  } catch (err) {
    next(err)
  }
})
