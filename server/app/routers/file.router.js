const express = require("express");
const Router = express.Router();
const controller = require("./../controller/file.controller")

Router.route('/file/create')
    .post(controller.create_file)

module.exports = Router;