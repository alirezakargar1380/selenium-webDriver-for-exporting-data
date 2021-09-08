const express = require("express");
const Router = express.Router();
const {Builder, By, Key, util} = require("selenium-webdriver");
fs = require('fs');
const db = require("../config/db");
const controller = require("../controller/selenium.controller")

Router
    .route("/runs")
    .post(controller.selenium)

Router
    .route("/run")
    .get(async (req, response) => {
        let driver = await new Builder().forBrowser("firefox").build();
        async function web(numsarray) {
            console.log(numsarray.length)
            try {
                const url = "https://portal.endress.com/webapp/SparePartFinder/?lang=en&appcall=NEBP&upselling=true&target=_parent&shoptarget=_parent&hookurl=https://portal.endress.com/webapp/nebp-shopapp/entry/apps?%26country%3Dcom%26nebp.hookTarget%3Dhttps://www.endress.com/shop";
                await driver.get(url).then( async () => {
                    setTimeout(async ()=> {
                        await driver
                            .executeScript(`document.querySelectorAll('.v-textfield-search-input')[0].setAttribute("name","qqq");`);
                        await driver
                            .executeScript("document.querySelectorAll('.v-button-search-button')[0].setAttribute('name','btntnntn');");

                        const num = numsarray;

                        function loop(count, callback, done) {
                            var counter = 0;
                            var next = () => {
                                counter++;
                                setTimeout(iteration, 1000);
                            };
                            var iteration = async function () {
                                if (counter < count) {
                                    console.log("counter: "+counter)
                                    console.log("add number to input");
                                    driver
                                        .findElement(By.name('qqq'))
                                        .sendKeys(num[counter])
                                        .then(()=>{
                                            console.log("clicked");
                                            driver
                                                // .findElement(By.id('btntnntn'))
                                                .findElement(By.name('btntnntn'))
                                                .click()
                                                .then(() => {
                                                    setTimeout(() => {
                                                        driver
                                                            .executeScript(
                                                                () => {
                                                                    return document.querySelectorAll('.v-window-wrap')[0].setAttribute('id', 'errorrrplace');
                                                                }).then(
                                                            () => {
                                                                // code dosent avalble
                                                                console.log("error");
                                                                driver
                                                                    .executeScript(() => {
                                                                        return document.querySelectorAll('div.v-button.v-widget')[3].setAttribute('id','okkkk');
                                                                    }).then(
                                                                    () => {
                                                                        db.query(`UPDATE order_code SET checked_status = "1", extend = "null" WHERE order_code = "${num[counter]}"`);
                                                                        driver
                                                                            .findElement(By.id('okkkk'))
                                                                            .click()
                                                                            .then(() => {
                                                                                continue_app();
                                                                            })
                                                                    }, () => {
                                                                        console.log("okkkk was not found and app was breake");
                                                                    }
                                                                );
                                                                console.log("code does not have any data");
                                                            }, () => {
                                                                // code was find
                                                                console.log("true");
                                                                driver
                                                                    .executeScript(() => {
                                                                        return document.querySelectorAll('.v-button-info-text-content > span > span')[0].innerText
                                                                    }).then(function (innerHTML) {
                                                                    console.log(innerHTML)
                                                                    // check content here
                                                                    if (innerHTML) {
                                                                        var order_code = String(innerHTML).replace(/\u200B/g, '');
                                                                        db.query(`UPDATE order_code SET checked_status = "1", extend = "${order_code}", avalible = "1" WHERE order_code = "${num[counter]}"`);
                                                                        continue_app();
                                                                    }
                                                                });
                                                            }
                                                        );
                                                    },19000
                                                    )
                                                });
                                        });
                                    function continue_app() {
                                        setTimeout(() => {
                                            driver
                                                .executeScript(`document.querySelectorAll('.v-textfield-search-input')[0].value = "";`);
                                            console.log("------------------------------------------------------------------------")
                                            callback(counter, next);
                                        }, 3000);
                                    }
                                } else {
                                    console.log("------------ app finish --------------")
                                    driver.quit();
                                }
                            }
                            iteration();
                        }

                        loop(num.length, function (i, next) {
                            next();
                        });

                    },2000);

                });
            } catch (e) {
                response.status(404)
                console.log("------------------------------------------------* failed *----------------------------------------------------");
                console.log(e);
                driver.quit();
                // await driver.get(url);
            }
        }
        var numsarray = [];
        db.query(`SELECT * FROM order_code WHERE checked_status = "0"`, (err, result) => {
            if (err) { res.send(err) } else {
                result.forEach( items => {
                    if (numsarray.length < 2000) numsarray.push(items.order_code)
                });
                response.status(200)
                web(numsarray);
            }
        });
    })

module.exports = Router