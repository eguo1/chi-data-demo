'use strict'

const router = require('express').Router()
const fetchAllWards = require('../services/ward-data')
const { Ward } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allWards = await Ward.findAll()
    res.json(allWards)
  } catch (err) {
    next(err)
  }
})

router.get('/fetch', async (req, res, next) => {
  try {
    const wardData = await fetchAllWards()
    res.json(wardData)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const foundWard = await Ward.findOne({
      where: {
        id: req.params.id
      }
    })
    const allPoints = await foundWard.aggregateCount()
    res.json(allPoints)
  } catch (err) {
    next(err)
  }
})

