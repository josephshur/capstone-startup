'use strict';

const bcrypt = require('bcrypt');
const sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    movieScore: DataTypes.INTEGER
  })

  User.associate = function(models) {
    User.hasMany(models.Movie);
    User.hasMany(models.Article);
    User.hasMany(models.Rating);
  }

  User.addHook('beforeCreate', async function(user) {
    const salt = await bcrypt.genSalt(10); 
    user.password = await bcrypt.hash(user.password, salt);
    console.log("BeforeCreate:", user);
  })

  User.prototype.comparePassword = function(password, done) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
    return done(err, isMatch);
  });
};

  return User;
};
