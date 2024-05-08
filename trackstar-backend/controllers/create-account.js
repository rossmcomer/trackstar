const router = require('express').Router()
const bcryptjs = require('bcryptjs')
const { User } = require('../models')

router.post('/', async (req, res) => {
  if (req.body.password === req.body.confirm) {
    try {
      const existingUser = await User.findOne({
        where: { username: req.body.username },
      })
      if (existingUser) {
        return res.status(409).json({ error: 'Username already exists' })
      }
      const newUser = await User.create({
        username: req.body.username,
        passwordHash: await bcryptjs.hash(req.body.password, 10),
      })

      res
        .status(201)
        .json({ message: 'Account created successfully', user: newUser })
    } catch (error) {
      console.error('Error creating account:', error)
      res.status(500).json({ error: 'Failed to create account' })
    }
  } else {
    res.status(500).json({ error: 'Passwords do not match' })
  }
})

module.exports = router
