const response = require("../utils/response.utitlity")
const order_code_Service = require('../service/order_code');

exports.select_all = async (req, res) => {
  try {
    const { offset, limit } = req.params
    const result = await order_code_Service.get(parseInt(offset), parseInt(limit))
    response.success(res, result)
  } catch (e) {
    response.exception(res, e)
  }
}

exports.delete_all = async (req, res) => {
  try {
    const result = await order_code_Service.TRUNCATE()
    response.success(res, result)
  } catch (e) {
    response.exception(res, e)
  }
}