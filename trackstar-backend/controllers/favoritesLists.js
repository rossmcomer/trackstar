const router = require('express').Router()

const { tokenExtractor } = require('../util/middleware')

const { Favorite, FavoritesList, User } = require('../models')
  
router.post('/', tokenExtractor, async (req, res) => {
    const userId = req.decodedToken.id

    try {
        let favoritesList = await FavoritesList.findOne({ where: { userId } })

        if (!favoritesList) {
            favoritesList = await FavoritesList.create({ userId })
        }

        const favorite = await Favorite.create({ ...req.body, favoritesListId: favoritesList.id })

        res.json(favorite)
    }
    catch(error) {
        return res.status(400).json({ error })
  }
})

router.put('/:id', tokenExtractor, async (req, res) => {
    const userId = req.decodedToken.id

    try {
        let favoritesList = await FavoritesList.findOne({ where: { userId } });

        if (!favoritesList) {
            favoritesList = await FavoritesList.create({ userId });
        }

        const favorite = await Favorite.create({ ...req.body, favoritesListId: favoritesList.id });

        res.json(favorite);
    } catch (error) {
        res.status(400).json({ error });
    }
})

module.exports = router