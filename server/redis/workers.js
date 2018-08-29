'use strict'

const { CrimeData } = require('../db/models')

module.exports.redisWorkers = {
  streamRow: {
    plugins: ['QueueLock'],
    perform: async data => {
      await CrimeData.create(data)
      return true
    }
  }
}
