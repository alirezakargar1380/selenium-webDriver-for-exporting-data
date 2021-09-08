const express = require("express");
const cors = require('cors');

const app = express();
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(cors());
require("./routers")(app)

module.exports = app