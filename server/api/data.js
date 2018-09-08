'use strict'

const router = require('express').Router()
const { CrimeData } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.query.geomStr) {
      const dataPoints = await CrimeData.filter(req.query.geomStr)
      res.json(dataPoints)
    } else {
      res.json([])
    }
  } catch (err) {
    next(err)
  }
})
