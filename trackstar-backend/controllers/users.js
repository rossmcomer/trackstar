const router = require('express').Router()
const bcrypt = require('bcrypt')

const { User, Favorite, FavoritesList } = require('../models')

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: Favorite,
        attributes: { exclude: ['userId'] },
      },
    })
    res.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ error: 'Error fetching users' })
  }
})

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(400).json({ error: 'Error creating user' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: FavoritesList,
          include: Favorite,
          attributes: { exclude: ['userId'] },
        },
      ],
    })

    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ error: 'User not found' })
    }
  } catch (error) {
    console.error('Error fetching user:', error)
    res.status(500).json({ error: 'Error fetching user' })
  }
})

router.put('/:username', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.username)
    if (user) {
      user.username = req.body.username
      await user.save()
      res.json(user)
    } else {
      res.status(404).json({ error: 'User not found' })
    }
  } catch (error) {
    console.error('Error updating user:', error)
    res.status(500).json({ error: 'Error updating user' })
  }
})

module.exports = router
