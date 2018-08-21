'use strict'

const { ImportData } = require('../db/models')

module.exports.redisWorkers = {
  streamRow: {
    plugins: ['QueueLock'],
    perform: async data => {
      await ImportData.create(data)
      return true
    }
  }
}
