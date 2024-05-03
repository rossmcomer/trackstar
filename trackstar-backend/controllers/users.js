const router = require('express').Router()
const bcryptjs = require('bcryptjs')

const { User, Favorite, FavoritesList } = require('../models')

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ error: 'Error fetching users' })
  }
})

router.post('/', async (req, res) => {
  try {
    const passwordHash = await bcryptjs.hash(req.body.password, 10)
    const user = await User.create({
      username: req.body.username.toLowerCase(),
      passwordHash: passwordHash,
    })
    res.json(user)
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(400).json({ error: 'Error creating user' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [
        {
          model: FavoritesList,
          include: [
            {
              model: Favorite,
              attributes: { exclude: ['favoritesListId'] },
            },
          ],
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

router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (user) {
      user.username = req.body.username.toLowerCase()
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
