'use strict'

const router = require('express').Router()
const fetchAllWards = require('../services/ward-data')
const { Ward } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allWards = await Ward.findAll({
      attributes: [ 'name', 'count', 'geom', 'area', 'border' ],
      order: [ [ 'count', 'DESC' ] ]
    })
    res.json(allWards)
  } catch (err) {
    next(err)
  }
})

router.get('/update-counts', async (req, res, next) => {
  try {
    const updatedCounts = await Ward.aggregateCount()
    res.json(updatedCounts)
  } catch (err) {
    next(err)
  }
})

router.get('/fetch', async (req, res, next) => {
  try {
    await fetchAllWards()
    const updatedWardData = await Ward.aggregateCount()
    res.json(updatedWardData)
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
    const allPoints = await foundWard.aggregateList()
    res.json(allPoints)
  } catch (err) {
    next(err)
  }
})

