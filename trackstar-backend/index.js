const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logoutRouter = require('./controllers/logout')
const favoritesRouter = require('./controllers/favorites')
const createAccountRouter = require('./controllers/create-account')

app.use(cors())
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/logout', logoutRouter)
app.use('/api/favorites', favoritesRouter)
app.use('/api/create-account', createAccountRouter)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error) {
    return response.status(400).send({ error: 'something went wrong' })
  }
  next(error)
}

app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
