const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
// app.use(express.static(path.join(__dirname, 'build')))

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logoutRouter = require('./controllers/logout')
const favoritesRouter = require('./controllers/favorites')
const createAccountRouter = require('./controllers/create-account')

app.use(cors())
app.use(express.json())

app.use('/users', usersRouter)
app.use('/login', loginRouter)
app.use('/logout', logoutRouter)
app.use('/favorites', favoritesRouter)
app.use('/create-account', createAccountRouter)

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })

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
