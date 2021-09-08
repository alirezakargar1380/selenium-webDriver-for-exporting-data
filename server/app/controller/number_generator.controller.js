const response = require("./../utils/response.utitlity")
const number_generator_service = require("../service/generator.service")

exports.generator = async (req, res) =>
{
  try {
    console.log(req.body)
    response.success(res, "done")
  } catch (e) {
    response.exception(res, e.message)
  }
}