const router = require('express').Router()
const { Favorite, User, FavoritesList } = require('../models')
const Sessions = require('../models/session')
const { tokenExtractor } = require('../util/middleware')

router.get('/', tokenExtractor, async (req, res) => {
  //   const columnName = req.query.sortBy
  const userId = req.decodedToken.id
  const user = await User.findByPk(req.decodedToken.id)

  if (user) {
    try {
      const favorites = await Favorite.findAll({
        where: { userId },
        order: [['ticker', 'ASC']],
        attributes: { exclude: ['userId'] },
      })

      console.log(JSON.stringify(favorites))
      res.json(favorites)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch favorites' })
    }
  }
})

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const userId = req.decodedToken.id
  const session = await Sessions.findOne({
    where: {
      userId: req.decodedToken.id,
      sessionId: req.sessionToken,
    },
  })
  if (user && session) {
    try {
      let favoritesList = await FavoritesList.findOne({ where: { userId } })

      if (!favoritesList) {
        favoritesList = await FavoritesList.create({ userId })
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
})

const favoriteFinder = async (req, res, next) => {
  req.favorite = await Favorite.findByPk(req.params.id)
  next()
}

router.delete('/:id', favoriteFinder, tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const session = await Sessions.findOne({
      where: {
        userId: req.decodedToken.id,
        sessionId: req.sessionToken,
      },
    })

    if (user && session) {
      if (req.favorite && req.favorite.userId === req.decodedToken.id) {
        await req.favorite.destroy()
        res.status(204).end()
      }
    } else {
      res
        .status(403)
        .json({ error: 'You do not have permssion to delete this.' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove favorite' })
  }
})

module.exports = router
