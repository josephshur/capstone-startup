'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {

    static associate(models) {
      Rating.belongsTo(models.Movie);
    }
  };
  Rating.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    comment: DataTypes.STRING,
    MovieId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};
