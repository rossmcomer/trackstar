const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Favorite extends Model {}

Favorite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    favoritesListId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      references: {
        model: 'favorites_list',
        key: 'id',
      },
    },
    ticker: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'favorite',
    updatedAt: false
  },
)

module.exports = Favorite
