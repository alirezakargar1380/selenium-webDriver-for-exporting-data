'use strict';
module.exports = function (sequelize, DataTypes) {
  const order_code = sequelize.define('order_code', {
    order_code: {
      type: DataTypes.TEXT,
    },
    checked_status: {
      type: DataTypes.TEXT,
    },
    extend: {
      type: DataTypes.TEXT,
    },
    available: {
      type: DataTypes.TEXT,
    },
  }, {
    paranoid: true
  },{
    tableName: "order_codes"
  });

  return order_code;
};