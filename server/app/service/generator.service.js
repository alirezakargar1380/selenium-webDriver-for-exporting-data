const { permute } = require("js-permuter");
const delay = require('delay');

exports.number_generator = async (body) => {
  var input = [ 'one', 'two', 'three', 'four', "five",
    "six", "sever", "eight", "nine", "ten", "eleven" ]

  const options = {
    [input[0]]: body.one,
    [input[1]]: ['1', '2', '3', '4'],
    [input[2]]: ['e', 'f', 'g', 'h'],
    [input[3]]: ['E', 'F', 'R', 'O'],
    // five: ['5', '6', '7', '8'],
    // six: ['9', 'I', 'J', 'K'],
    // seven: ['9', 'I', 'J', 'K'],
    // eight: ['9', 'I', 'J', 'K'],
    // nine: ['9', 'I', 'J', 'K'],
    // ten: ['9', 'I', 'J', 'K'],
  }
  return console.log(options)

  const allCombinations = permute(options);
  console.log(allCombinations)
  console.log('done')

  for (let i = 0; i < allCombinations.length; i++) {
    var number
    number = allCombinations[i][input[0]] + allCombinations[i][input[1]] + allCombinations[i][input[2]] + allCombinations[i][input[3]]
    console.log('---> ' + number)
    console.log('******************-----------------***************************')
    await delay(1000)
  }

}
