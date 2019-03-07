'use strict';
module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define('History', {
    date: DataTypes.DATE,
    open: DataTypes.DECIMAL(10,2),
    close: DataTypes.DECIMAL(10,2),
    high: DataTypes.DECIMAL(10,2),
    low: DataTypes.DECIMAL(10,2),
    volume: DataTypes.BIGINT
  }, {});

  History.associate = function (models) {
    History.belongsTo(models.Symbol);
  };

  return History;
};