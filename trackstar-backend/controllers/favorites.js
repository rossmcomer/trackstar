const router = require('express').Router()
const { Favorite, User } = require('../models')
const Sessions = require('../models/session')
const { tokenExtractor } = require('../util/middleware')

router.get('/', async (req, res) => {
    const columnName = req.query.sortBy;

    const favorites = await Favorite.findAll({
        order:[
            ['ticker', 'ASC']
        ],
        attributes: { exclude: ['userId'] },
        include: {
        model: User,
        attributes: ['id']
        }
    })
  
    console.log(JSON.stringify(favorites))
    res.json(favorites)
})
  
router.post('/', tokenExtractor, async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id)
    const session = await Sessions.findOne({
        where: {
            userId: req.decodedToken.id,
            sessionId: req.sessionToken
        }
        })
        if (user && session){
        const favorite = await Favorite.create({...req.body, userId: user.id})
        return res.json(favorite)
    }
})

const favoriteFinder = async (req, res, next) => {
    req.favorite = await Favorite.findByPk(req.params.id)
    next()
}

router.delete('/:id', favoriteFinder, tokenExtractor, async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id)
    const session = await Sessions.findOne({
        where: {
          userId: req.decodedToken.id,
          sessionId: req.sessionToken
        }
      })
    if (user && session) {
        if (req.favorite && req.favorite.userId === req.decodedToken.id){
            await req.favorite.destroy()
            res.status(204).end()
        }} else {
            res.status(403).json({error: 'You do not have permssion to delete this.'})
        }
    
})

module.exports = router