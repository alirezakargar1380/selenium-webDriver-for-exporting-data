const {
  order_code
} = require('../models');
const Exception = require('../utils/error.utility');
const log = require('../utils/log.utility')

exports.get = async () => {

  try {
    await order_code.findAll({
      limit: 10,
      offset: 0
    })
  } catch (error) {
    log.error(error);
    Exception.setError(error, false);
  }

}

exports.update = async (json) => {

  try {
    await order_code.update(json,{
      where: { id: json.id }
    })
  } catch (error) {
    log.error(error);
    Exception.setError(error, false);
  }

}

exports.get_all_unchecked = async (offset, limit) => {

  try {
    return await order_code.findAll({
      where: {
        checked_status: 'false'
      },
      limit: limit,
      offset: offset
    })
  } catch (error) {
    log.error(error);
    Exception.setError(error, false);
  }

}

// try {
//
//   console.log(order_code)
//   order_code.create({
//     order_code: "lop",
//   })
//   return true;
//
// } catch (error) {
//   log.error(error);
//   Exception.setError(error, false);
// }
