const { permute } = require("js-permuter");
const delay = require('delay');
const order_code = require("./order_code");

exports.number_generator = async (body) => {
  var input = [ 'one', 'two', 'three', 'four', "five",
    "six", "seven", "eight", "nine", "ten", "eleven" ]

  const options = {
    [input[0]]: body.one,
    [input[1]]: body.two,
    [input[2]]: body.three,
    [input[3]]: body.four,
    [input[4]]: body.five,
    [input[5]]: body.six,
    [input[6]]: body.seven,
    [input[7]]: body.eight,
    [input[8]]: body.nine,
    [input[9]]: body.ten,
    [input[10]]: body.eleven,
  }

  // for (let i = 0; i < options.length; i++) {
  //   console.log(options[i])
  // }

  const allCombinations = permute(options);
  console.log("----------------")
  for (let i = 0; i < allCombinations.length; i++) {
    var number
    number = allCombinations[i][input[0]] + allCombinations[i][input[1]]
        + allCombinations[i][input[2]] + allCombinations[i][input[3]] + allCombinations[i][input[4]]
        + allCombinations[i][input[5]] + allCombinations[i][input[6]] + allCombinations[i][input[7]]
        + allCombinations[i][input[8]] + allCombinations[i][input[9]] + allCombinations[i][input[10]]

    var json = {
      order_code: number,
      checked_status: "false",
      extend: null,
      available: "false"
    }
    await order_code.create(json)
    console.log('---> ' + number)
    await delay(1000)
  }

}
