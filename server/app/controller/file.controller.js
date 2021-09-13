const response = require("./../utils/response.utitlity")
const order_code_service = require("./../service/order_code")
const persianDate = require("persian-date")
const fs = require("fs")

function getPersianDate() {
  // export time
  const date = new persianDate().toLeapYearMode('algorithmic');
  const year = date.year();
  const month = date.month();
  const hour = date.hour();
  const min = date.minute();
  const day = date.date();
  return year+"-"+month+"-"+day+"--"+hour+"-"+min;
}

exports.create_file = async (req, res) => {
  try {
    var data;
    const all_available_extend_code = await order_code_service.get_all_available_extend()
    all_available_extend_code.forEach( item => {
        if (data) {
          data = data+'\n'+item.id+")  "+item.order_code+" --> "+item.extend;
        } else {
          data = item.id+")  "+item.order_code+" --> "+item.extend;
        }
    });
    var fileName = getPersianDate();
    fs.writeFile(`${__dirname}/../Files/${fileName}.txt`, data, (err, result) => {
      // if (err) return err;
      response.success(res, "created")
    })

  } catch (e) {
    response.exception(res, e.message)
  }
}