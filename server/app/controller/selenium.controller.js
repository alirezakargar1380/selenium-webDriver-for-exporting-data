const order_code_Service = require('../service/order_code');
const response = require("../utils/response.utitlity")
const selenium = require("../service/selenium.service");
const delay = require("delay");
const log = require("../utils/log.utility");

let run_counter = 0

async function sel(params) {
  try {
    run_counter++
    const { biggerThan } = params
    const open_selenium = new selenium()
    await open_selenium.open_browser()
    open_selenium.url = process.env.WEB_PAGE_URL
    const open_web_page_result = await open_selenium.open_webpage()
    if (open_web_page_result.status)
    {
      console.log('page was opened....')
      await delay(10000)
      await open_selenium.add_execute_script()
      const get_unchecked_data = await order_code_Service.get_all_unchecked(biggerThan)
      // console.log(get_unchecked_data)
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
              log.info(get_unchecked_data[counter].order_code)
              // add order code to input
              await open_selenium.send_order_code_for_search(get_unchecked_data[counter].order_code)
              await open_selenium.click_on_search_btn()
              // waiting for get code
              await delay(parseInt(process.env.WAIT_TIME_FOR_GET_CODE))
              const extend_status = await open_selenium.check_for_extend_value()
              if (extend_status.status)
              {
                log.success("200")
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
                log.error("404")
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
                // emty_input
                await open_selenium.emty_input_value()
                next()
              }
            log.info('<----------------------------------------->')
            } catch (e) {
              if (run_counter >= parseInt(process.env.ERROR_TIMES))
                return console.log('tired to run')
              sel(params)
              log.console('controller e 1');
              log.error(e.message)
            }
          } else {
            console.log("finish")
            open_selenium.quit()
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
    if (run_counter >= parseInt(process.env.ERROR_TIMES))
      return console.log('tired to run')
    sel(params)
    open_selenium.quit()
    log.console('controller e');
    log.error(e.message)
  }
}

exports.stop = async (req, res) => {
  try {
    process.exit(1)
    response.success(res, "ddd")
  } catch (e) {
    console.log('controller');
    response.exception(res, e.message)
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

