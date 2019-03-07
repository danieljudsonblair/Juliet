'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {});

  User.associate = function (models) {
    User.belongsToMany(models.Symbol, { through: 'UserSymbol' });
  };

  User.prototype.comparePassword = function (challenge) {
    return this.password === challenge;
  }

  return User;
};