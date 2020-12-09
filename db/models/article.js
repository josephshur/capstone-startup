'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Article.hasMany(models.Comment);
      Article.belongsTo(models.User);
    }
  };
  Article.init({
    title: DataTypes.STRING,
    desc: DataTypes.STRING,
    body: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};
