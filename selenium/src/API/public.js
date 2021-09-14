const {BASE_URL} = require('./../env/env');
const axios = require("axios");

module.exports.get_order_codes = (offset, limit) => {
  return axios.get(BASE_URL+`/order_code/get/${offset}/${limit}`)
}

module.exports.generator = (body) => {
  return axios.post(BASE_URL+`/number_generator`, body)
}

module.exports.robot = (biggerThan) => {
  return axios.post(BASE_URL+`/selenium_bot/run/${biggerThan}`)
}

module.exports.create_file = () => {
  return axios.post(BASE_URL+`/file/create`)
}

module.exports.delete_all_records = () => {
  return axios.delete(BASE_URL+`/order_code/delete_all`)
}

