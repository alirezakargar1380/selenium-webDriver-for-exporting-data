const dotenv = require("dotenv");
// const mysql = require("mysql2");
const Sequelize = require('sequelize')
// should add remote db connection
dotenv.config({
  path: "./app/config/config.env"
})

const db = new Sequelize(process.env.DB_NAME , process.env.DB_USER , process.env.DB_PASSWORD , {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 5 ,
    min: 0 ,
    acquire: 30000 ,
    idle: 10000
  }
})

module.exports = db