const order_code_Service = require('../service/order_code');
const response = require("../utils/response.utitlity")
const selenium = require("../service/selenium.service");
const delay = require("delay");

async function sel(params) {
  try {
    const { offset, limit } = params
    const open_selenium = new selenium()
    await open_selenium.open_browser()
    open_selenium.url = process.env.WEB_PAGE_URL
    const open_web_page_result = await open_selenium.open_webpage()
    console.log(open_web_page_result)
    if (open_web_page_result.status)
    {
      await delay(5000)
      await open_selenium.add_execute_script()
      console.log('-->')
      const get_unchecked_data = await order_code_Service.get_all_unchecked(parseInt(offset), parseInt(limit))
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
              // add order code to input
              await open_selenium.send_order_code_for_search(get_unchecked_data[counter].order_code)
              await open_selenium.click_on_search_btn()
              // waiting for get code
              await delay(10000)
              const extend_status = await open_selenium.check_for_extend_value()
              if (extend_status.status)
              {
                console.log("200")
                console.log("func =>>> num: "+counter+" "+get_unchecked_data[counter].order_code)
                // export extend code
                const extend_code = await open_selenium.get_extend_code()
                var json = {
                  id: get_unchecked_data[counter].id,
                  extend: extend_code,
                  checked_status: "true",
                  available: "true"
                }
                await order_code_Service.update(json)
                // emty_input
                await open_selenium.emty_input_value()
                // countinu app
                next()

              } else {
                console.log("404")
                await open_selenium.error_box_execute_script()
                // update code to db for that no has any data
                var json = {
                  id: get_unchecked_data[counter].id,
                  extend: null,
                  checked_status: "true",
                  available: "false"
                }
                await order_code_Service.update(json)
                await open_selenium.click_for_close_error_box()
                console.log("func =>>> num: "+counter+" "+get_unchecked_data[counter].order_code)
                // emty_input
                await open_selenium.emty_input_value()
                next()
              }
            } catch (e) {
              console.log('controller e 1');
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
    sel(params)
    console.log('controller e');
  }
}

exports.selenium = async (req, res) => {
  try {
    sel(req.params)
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

