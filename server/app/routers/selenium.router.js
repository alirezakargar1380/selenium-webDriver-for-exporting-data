const express = require("express");
const Router = express.Router();
const controller = require("./../controller/selenium.controller")

Router.route('/selenium_bot/run/:biggerThan')
    .post(controller.selenium)

module.exports = Router;