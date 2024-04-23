const jwt = require('jsonwebtoken')
const router = require('express').Router()
const bcrypt = require('bcrypt')

const { SECRET } = require('../util/config')
const User = require('../models/user')
const Sessions = require('../models/session')

router.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username,
    },
  })
// ADD MODAL TO CREATE ACCOUNT
  if (!user) {
    return response
      .status(403)
      .json({ error: 'User not found. Would you like to create an account?' })
  }

  const passwordCorrect = await bcrypt.compare(
    body.password,
    user.passwordHash,
  )

  if (!passwordCorrect) {
    return response.status(401).json({ error: 'Invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  await Sessions.create({ userId: user.id, sessionId: token })

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router
