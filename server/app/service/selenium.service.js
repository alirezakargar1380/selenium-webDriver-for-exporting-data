const {Builder, By, Key, util} = require("selenium-webdriver");
const Exception = require("../utils/error.utility");
const log = require("../utils/log.utility");

// v-Notification system v-Notification-system v-position-top v-position-center
module.exports = class SeleniumService {
  constructor() {
    this.selenium = ""
    this.driver = ""
    this.url = ""
    this.result = {}
    this.extend = ""
  }

  async open_browser() {
    this.driver = await new Builder().forBrowser("firefox").build()
  }

  quit() {
    this.driver.quit()
  }

  async open_webpage() {
    try {
      await this.driver.get(this.url)
          .then(() => {
            this.result.status = true
          })
          // .catch(() => {
          //   console.log('catch in driver.get ')
          //   this.driver.quit()
          //   this.result.status = false
          // })
      if (this.result.status) return this.result
      // return this.result
    } catch (e) {
      // console.log('quit from selenium...')
      // this.result.status = false
      await this.driver.quit()
      throw Exception.setError(e)
    }
  }

  async add_execute_script() {
    try {
      await this.driver
          .executeScript(`document.querySelectorAll('.v-textfield-search-input')[0].setAttribute("name","qqq");`);
      await this.driver
          .executeScript("document.querySelectorAll('.v-button-search-button')[0].setAttribute('name','btntnntn');");
    } catch (e) {
      this.quit()
      throw Exception.setError(e)
    }
  }

  async send_order_code_for_search(value) {
    try {
      await this.driver
          .findElement(By.name('qqq'))
          .sendKeys(value)
          .then(() => {
            this.result.status = true
          })
    } catch (e) {
      // this.quit()
      throw Exception.setError(e)
    }
  }

  async click_on_search_btn()
  {
    try {
    await this.driver
        .findElement(By.name('btntnntn'))
        .click()
    //
    // await this.driver
    //     .wait(this.driver.executeScript(() => {
    //         return document.readyState
    //     })).then(() => {
    //         console.log('code loaded...')
    //     }).catch((e) => {
    //         console.log(e)
    //     })
    } catch (e) {
      // this.quit()
      throw Exception.setError(e)
    }
  }

  async none_loading()
  {
    try {
      await this.driver.executeScript(() => {
        return document.querySelectorAll('.v-loading-indicator')[0].style.display = "none"
      }).then((res) => {
        // console.log(res.display)
      })
    } catch (e) {
      throw Exception.setError(e)
    }
  }

  async checking_loading() {
    try {
      await this.driver.executeScript(() => {
        return document.querySelectorAll('.v-loading-indicator')[0].style.display
      }).then( async (res) => {
        if (res !== "none") await this.checking_loading()
      })
    } catch (e) {
      throw Exception.setError(e)
    }
  }

  async check_session_expiring() {
    try {
      return await this.driver.executeScript(() => {
        return document.querySelectorAll('.v-Notification-system')[0]
      }).then( (res) => {
        if (res !== null)
        {
          log.error("------------------------------------------------------------------------- session was expire")
          return false
        }

      })
    } catch (e) {

    }
  }

  async check_for_extend_value()
  {
    try {
      await this.driver.executeScript(() => {
        return document.querySelectorAll('.v-window-wrap')[0].setAttribute('id', 'errorrrplace');
      }).then(() => {
        // console.log('code was not find')
        this.result.status = false
      }, () => {
        // console.log('code was find')
        this.result.status = true
      })
      // console.log('-> resutl')
      // console.log(this.result)
      return this.result
    } catch (e) {
      // this.quit()
      throw Exception.setError(e)
    }
  }

  async error_box_execute_script() {
    try {
      await this.driver
          .executeScript(() => {
            return document.querySelectorAll('div.v-button.v-widget')[3].setAttribute('id', 'error-box-ok-btn');
          })
    } catch (e) {
      // this.quit()
      throw Exception.setError(e)
    }
  }

  async click_for_close_error_box() {
    try {
      await this.driver.findElement(By.id('error-box-ok-btn')).click()
    } catch (e) {
      // this.quit()
      throw Exception.setError(e)
    }
  }

  async get_extend_code() {
    try {
      return await this.driver.executeScript(() => {
        return document.querySelectorAll('.v-button-info-text-content > span > span')[0].innerText
      }).then(function (innerHTML) {
        return String(innerHTML).replace(/\u200B/g, '')
      })
    } catch (e) {
      // this.quit()
      throw Exception.setError(e)
    }
  }

  async emty_input_value() {
    await this.driver.executeScript(`document.querySelectorAll('.v-textfield-search-input')[0].value = "";`);
  }

}