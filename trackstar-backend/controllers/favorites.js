const router = require('express').Router()
const { Favorite, User, FavoritesList } = require('../models')
const Sessions = require('../models/session')
const { tokenExtractor } = require('../util/middleware')

router.get('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const favoritesList = await FavoritesList.findOne({ where: { userId: user.id }})

  if (user) {
    try {
      const favorites = await Favorite.findAll({
        where: { favoritesListId: favoritesList.id },
        order: [['ticker', 'ASC']],
        attributes: { exclude: ['favoritesListId', 'id'] },
      })

      console.log(JSON.stringify(favorites))
      res.json(favorites)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch favorites' })
    }
  }
  else { 
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
      let favoritesList = await FavoritesList.findOne({ where: { userId: req.decodedToken.id } })
      
      if (!favoritesList) {
        favoritesList = await FavoritesList.create({ userId: req.decodedToken.id })
      }

      const favorite = await Favorite.create({
        ...req.body,
        favoritesListId: favoritesList.id,
      })
      return res.json(favorite)
    } catch (error) {
      res.status(400).json({ error: 'Failed to add ticker as favorite' })
    }
  }
  else { 
    return res.status(404).json({ error: 'User or session not found' })
  }
})

const favoriteFinder = async (req, res, next) => {
  req.favorite = await Favorite.findByPk(req.params.id)
  next()
}

router.delete('/:id', favoriteFinder, tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const favoritesList = await FavoritesList.findOne({ where: { userId: req.decodedToken.id } })
    const session = await Sessions.findOne({
      where: {
        userId: req.decodedToken.id,
        sessionId: req.sessionToken,
      },
    })

    if (user && session && favoritesList) {
      if (req.favorite && req.favorite.favoritesListId === favoritesList.id) {
        await req.favorite.destroy()
        res.status(200).json({ message: 'Favorite successfully removed' })
      }
      else {
        res
          .status(403)
          .json({ error: 'You do not have permssion to delete this.' })
      }
    }
    else { 
      return res.status(404).json({ error: 'User or session not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove favorite' })
  }
})

module.exports = router