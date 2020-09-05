import Queue from 'bull'
import redis from '../config/redis.js'
import * as jobs from '../jobs/index.js'

const queues = Object.values(jobs).map((job) => ({
  bull: new Queue(job.key, redis),
  name: job.key,
  handle: job.handle,
  options: job.options,
}))

export default {
  queues,
  add(name, data) {
    const queue = this.queues.find((q) => q.name === name)
    return queue.bull.add(data, queue.options)
  },
  process() {
    return this.queues.forEach((q) => {
      q.bull.process(q.handle)
      q.bull.on('failed', (job, err) => {
        console.log('job failed', q.key, job.data)
        console.log(err)
      })
    })
  },
}
