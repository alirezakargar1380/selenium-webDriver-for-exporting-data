const mysql = require("mysql");

var connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "mehdi_azizi"
});

module.exports = connection;
