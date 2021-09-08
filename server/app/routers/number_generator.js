const express = require("express");
const Router = express.Router();
const controller = require("../controller/number_generator.controller")

Router
    .route('/number_generator')
    .post(controller.generator)

module.exports = Router;
