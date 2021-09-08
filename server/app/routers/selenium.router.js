const express = require("express");
const Router = express.Router();
const controller = require("./../controller/selenium.controller")

Router.route('/selenium_bot/run/:offset/:limit')
    .post(controller.selenium)

module.exports = Router;