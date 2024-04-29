const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class FavoritesList extends Model {}

FavoritesList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'favorites_list',
    freezeTableName: true,
  },
)

module.exports = FavoritesList
