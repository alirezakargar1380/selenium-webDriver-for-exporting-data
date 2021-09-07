const order_code_Service = require('../service/order_code');
const response = require("../utils/response.utitlity")
const selenium = require("../service/selenium.service");
const delay = require("delay");

async function sel() {
  try {
    const offset = 0
    const limit = 10
    const open_selenium = new selenium()
    await open_selenium.open_browser()
    open_selenium.url = process.env.WEB_PAGE_URL
    const open_web_page_result = await open_selenium.open_webpage()
    console.log(open_web_page_result)
    if (open_web_page_result.status)
    {
      // await delay(5000)
      // await open_selenium.add_execute_script()
      console.log('-->')
      const get_unchecked_data = await order_code_Service.get_all_unchecked(offset, limit)
      function loop(count, callback, done) {
        var counter = 0;
        var next = () => {
          counter++;
          setTimeout(iteration, 1000);
        };
        var iteration = async function () {
          if (counter < count)
          {
            try {
              console.log("func =>>> num: "+counter+" "+get_unchecked_data[counter].order_code)
              // add order code to input
              await open_selenium.send_order_code_for_search(get_unchecked_data[counter].order_code)
              // next();
            } catch (e) {
              sel()
            }
          } else {
            console.log("finish")
          }
        }
        iteration();
      }

      loop(get_unchecked_data.length, function (i, next) {
        next();
      });

    }
  } catch (e) {
    // loop browser
    sel()
    console.log('controller e');
  }
}

exports.selenium = async (req, res) => {
  try {
    sel()
    return response.success(res, '')
    // const open_selenium = new selenium()
    // await open_selenium.open_browser()
    // open_selenium.url = process.env.WEB_PAGE_URL
    // await open_selenium.open_webpage(process.env.WEB_PAGE_URL)
    // response.success(res, '')
  } catch (e) {
    console.log('controller');
    response.exception(res, e.message)
  }
}

