const router = require('express').Router()
const { Favorite, User, FavoritesList } = require('../models')
const Sessions = require('../models/session')
const { tokenExtractor } = require('../util/middleware')

router.get('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)

  if (user) {
    try {
      const favoritesList = await FavoritesList.findOne({
        where: { userId: user.id },
      })
      const favorites = await Favorite.findAll({
        where: { favoritesListId: favoritesList.id },
        order: [['coingecko_id', 'ASC']],
        attributes: { exclude: ['favoritesListId', 'id'] },
      })

      console.log(JSON.stringify(favorites))
      res.json(favorites)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch favorites' })
    }
  } else {
    return res.status(404).json({ error: 'User not found' })
  }
})

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const session = await Sessions.findOne({
    where: {
      userId: req.decodedToken.id,
      sessionId: req.sessionToken,
    },
  })

  if (user && session) {
    try {
      let favoritesList = await FavoritesList.findOne({
        where: { userId: req.decodedToken.id },
      })

      if (!favoritesList) {
        favoritesList = await FavoritesList.create({
          userId: req.decodedToken.id,
        })
      }

      const favorite = await Favorite.create({
        coingeckoId: req.body.id,
        favoritesListId: favoritesList.id,
      })
      return res.json(favorite)
    } catch (error) {
      res.status(400).json({ error: 'Failed to add coin as favorite' })
    }
  } else {
    return res.status(404).json({ error: 'User or session not found' })
  }
})

router.delete('/:id', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const favoritesList = await FavoritesList.findOne({
      where: { userId: req.decodedToken.id },
    })
    const favorite = await Favorite.findOne({
      where: {
        favoritesListId: favoritesList.id,
        coingeckoId: req.params.id,
      },
    })
    const session = await Sessions.findOne({
      where: {
        userId: req.decodedToken.id,
        sessionId: req.sessionToken,
      },
    })

    if (user && session) {
      if (favorite) {
        await favorite.destroy()
        res.status(200).json({ message: 'Favorite successfully removed' })
      } else {
        res.status(403).json({ error: 'Favorite does not exist' })
      }
    } else {
      return res.status(404).json({ error: 'User or session not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove favorite' })
  }
})

module.exports = router
