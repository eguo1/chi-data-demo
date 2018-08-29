'use strict'

const router = require('express').Router()
const fetchAllWards = require('../services/ward-data')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    await fetchAllWards()
    res.json('SUCCESS!')
  } catch (err) {
    next(err)
  }
})
