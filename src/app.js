import express from 'express'
import routes from './routes'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', routes)

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500)
})

export default app
