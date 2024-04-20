const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Favorite extends Model {}

Favorite.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  favoritesListId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'favorites_lists', 
      key: 'id'
    }
  },
  ticker: {
    type: DataTypes.STRING(10),
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'favorite'
})

module.exports = Favorite