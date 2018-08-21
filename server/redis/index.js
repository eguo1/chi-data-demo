'use strict'

// const schedule = require('node-schedule')
const NodeResque = require('node-resque')
const { redisWorkers } = require('./workers')

const connectionDetails = {
  pkg: 'ioredis',
  host: '127.0.0.1',
  password: null,
  port: 6379,
  database: 0
}

async function bootRedis() {

  const worker = new NodeResque.Worker({ connection: connectionDetails, queues: ['csv-parser'] }, redisWorkers)
  await worker.connect()
  worker.start()

  const scheduler = new NodeResque.Scheduler({ connection: connectionDetails })
  await scheduler.connect()
  scheduler.start()

  worker.on('start', () => console.log('worker started'))
  // worker.on('end', () => console.log('worker ended'))
  // worker.on('cleaning_worker', (workerName, pid) => console.log(`cleaning old worker ${workerName}`))
  // worker.on('poll', queueName => console.log(`worker polling ${queueName}`))
  // worker.on('job', (queueName, job) => console.log(`working job ${queueName} ${JSON.stringify(job)}`))
  // worker.on('reEnqueue', (queueName, job, plugin) => console.log(`reEnqueue job (${plugin}) ${queueName} ${JSON.stringify(job)}`))
  // worker.on('success', (queueName, job, result) => console.log(`job success ${queueName} ${JSON.stringify(job)} >> ${result}`))
  worker.on('failure', (queueName, job, failure) => console.log(`job failure ${queueName} ${JSON.stringify(job)} >> ${failure}`))
  worker.on('error', (error, queueName, job) => console.log(`error ${queueName} ${JSON.stringify(job)} >> ${error}`))
  // worker.on('pause', () => console.log('worker paused'))

  scheduler.on('start', () => console.log('scheduler started'))
  // scheduler.on('end', () => console.log('scheduler ended'))
  // scheduler.on('poll', () => console.log('scheduler polling'))
  // scheduler.on('master', state => console.log('scheduler became master'))
  scheduler.on('error', error => console.log(`scheduler error >> ${error}`))
  // scheduler.on('workingTimestamp', timestamp => console.log(`scheduler working timestamp ${timestamp}`))
  // scheduler.on('transferredJob', (timestamp, job) => console.log(`scheduler enqueuing job ${timestamp} >> ${JSON.stringify(job)}`))

  // const queue = new NodeResque.Queue({ connection: connectionDetails }, redisWorkers)
  // queue.on('error', error => console.error(error))
  // await queue.connect()

  const shutdown = async () => {
    await scheduler.end()
    await worker.end()
    console.log('see ya')
    process.exit()
  }

  process.on('SIGTERM', shutdown)
  process.on('SIGINT', shutdown)
}

module.exports = {
  connectionDetails,
  bootRedis
}
