const response = require("../utils/response.utitlity")

exports.select_all = (req, res) => {
  try {

  } catch (e) {
    console.log('controller');
    response.exception(res, e.message)
  }
}