const {
  order_code
} = require('../models');
const Exception = require('../utils/error.utility');
const log = require('../utils/log.utility')
const db = require("../config/db");
const { Op } = require("sequelize");

exports.get = async (offset, limit) => {

  try {
    return await order_code.findAll({
      offset: offset,
      limit: limit
    })
  } catch (error) {
    log.error(error);
    Exception.setError(error, false);
  }

}

exports.create = async (json) => {
  try {
    await order_code.create(json)
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

exports.TRUNCATE = async () => {

  try {
    return await db.query("TRUNCATE order_codes")
  } catch (error) {
    log.error(error);
    Exception.setError(error, false);
  }

}

exports.get_all_unchecked = async (biggerThan) => {

  try {
    return await order_code.findAll({
      where: {
        checked_status: "false",
        id: {
          [Op.gte]: parseInt(biggerThan)
        }
      },
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
