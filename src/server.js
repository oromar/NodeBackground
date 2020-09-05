import express from 'express'
import 'dotenv/config.js'
import UserController from './app/controllers/UserController.js'
import BullBoard from 'bull-board'
import Queue from './app/lib/Queue.js'

const app = express()
BullBoard.setQueues(Queue.queues.map((q) => q.bull))

app.use(express.json())

app.post('/users', UserController.store)
app.use('/admin/queues', BullBoard.UI)

app.listen(process.env.PORT, () => console.log('listening'))
