import express, { Application } from 'express'
import { routes } from './routes'
import { logger } from './utils/logger'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

// connect DB
mongoose
  .connect(`${process.env.DB_URL}`)
  .then(() => {
    logger.info('connected to mongodb')
  })
  .catch((err) => {
    logger.info('could not connect to db')
    logger.error(err)
    process.exit(1)
  })

const app: Application = express()
const port: number = 4000

// parse body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// cors access handler
app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

routes(app)

app.listen(port, () => {
  logger.info(`Server is listening on port ${port}`)
})
