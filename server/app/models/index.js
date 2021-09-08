'use strict';
var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
// console.log(basename)
// var env       = process.env.NODE_ENV || 'development';
// var config    = require('../../config/config.json')[env];
var db        = {};

//Create a Sequelize connection to the database using the URL in config/config.js
var sequelize = new Sequelize(process.env.DB_NAME , process.env.DB_USER , process.env.DB_PASSWORD , {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  dialect: 'mysql',
  // logging: false,
  // pool: {
  //   max: 5 ,
  //   min: 0 ,
  //   acquire: 30000 ,
  //   idle: 10000
  // }
})

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    // console.log(file)
    var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    // console.log(model)
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  // console.log(modelName)
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;
