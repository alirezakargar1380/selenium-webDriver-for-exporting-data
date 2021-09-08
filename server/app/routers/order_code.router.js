const express = require("express");
const Router = express.Router();
const controller = require("./../controller/order_code.controller")

Router
    .route('/order_code/get/:offset/:limit')
    .get(controller.select_all)

Router
    .route('/order_code/delete_all')
    .delete(controller.delete_all)

module.exports = Router;
