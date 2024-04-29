const router = require('express').Router()
const bcryptjs = require('bcryptjs')
const { User } = require('../models')

router.post('/', async (req, res) => {
  const body = req.body
  if (req.body.password === req.body.confirm){
    try {
      const newUser = await User.create({
        username: body.username,
        passwordHash: await bcryptjs.hash(body.password, 10),
      })

      res
        .status(201)
        .json({ message: 'Account created successfully', user: newUser })
    } catch (error) {
      console.error('Error creating account:', error)
      res.status(500).json({ error: 'Failed to create account' })
    }
  }
  else {
    res.status(500).json({ error: 'Passwords do not match' })
  }
})

module.exports = router