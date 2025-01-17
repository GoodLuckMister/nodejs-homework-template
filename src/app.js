const express = require('express')
const logger = require('morgan')
const cors = require('cors')
// const path = require('path')
const helmet = require('helmet')
const rateLimit = require("express-rate-limit")
const { HttpCode } = require('./helpers/constants')
const { apiLimit, jsonLimit } = require('./config/rate-limit.json')
const { ErrorHandler } = require('./helpers/errorhandler')
const contactsRouter = require('./api/contacts')
const usersRouter = require('./api/users')

require('dotenv').config()
// const STATIC_OF_USERS = process.env.STATIC_OF_USERS
// const AVATARS = process.env.AVATARS


const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'


app.use(helmet())
// app.use(`/${AVATARS}`, express.static(path.join(__dirname, '..', STATIC_OF_USERS, AVATARS)))
app.get('env') !== 'test' && app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json({ limit: jsonLimit }))

app.use("/api/", rateLimit({
  windowMs: apiLimit.windowMs,
  max: apiLimit.max,
  handler: (req, res, next) => {
    next(
      new ErrorHandler(
        HttpCode.BAD_REQUEST,
        'Исчерпано количество запросов за 15 минут'
      )
    )
  }
}))
app.use('/api/users', usersRouter)

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: 'error',
    code: HttpCode.NOT_FOUND,
    message: `Use api on routes ${req.baseUrl}/api/contacts`,
    data: 'Not found',
  })
})

app.use((err, req, res, next) => {
  err.status = err.status ? err.status : HttpCode.INTERNAL_SERVER_ERROR
  res.status(err.status).json({
    status: err.status === 500 ? 'fail' : 'error',
    code: err.status,
    message: err.message,
    data: err.status === 500 ? 'Internal server error' : err.data,
  })
})

module.exports = app
