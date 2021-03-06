'use strict'

const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/wards', require('./wards'))
router.use('/neighborhoods', require('./neighborhoods'))
router.use('/crime-data', require('./crimeData'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
