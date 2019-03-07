'use strict';
module.exports = (sequelize, DataTypes) => {
  const Symbol = sequelize.define('Symbol', {
    symbol: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }, 
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  Symbol.associate = function (models) {
    Symbol.belongsToMany(models.User, { through: 'UserSymbol' });
    Symbol.hasMany(models.History);
  };

  return Symbol;
};