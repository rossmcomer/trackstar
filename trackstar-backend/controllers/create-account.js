const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Sessions } = require('../models')

router.post('/', async (request, response) => {
  const body = request.body

  try {
    const newUser = await User.create({
      username: body.username,
      passwordHash: await bcrypt.hash(body.password, 10),
    })

    response
      .status(201)
      .json({ message: 'Account created successfully', user: newUser })
  } catch (error) {
    console.error('Error creating account:', error)
    response.status(500).json({ error: 'Failed to create account' })
  }
})
