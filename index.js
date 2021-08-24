 const {Builder, By, Key, util} = require("selenium-webdriver");
fs = require('fs');

async function web() {
    let driver = await new Builder().forBrowser("firefox").build();
    try {
        const url = "https://portal.endress.com/webapp/SparePartFinder/?lang=en&appcall=NEBP&upselling=true&target=_parent&shoptarget=_parent&hookurl=https://portal.endress.com/webapp/nebp-shopapp/entry/apps?%26country%3Dcom%26nebp.hookTarget%3Dhttps://www.endress.com/shop";
        await driver.get(url).then( async () => {
            setTimeout(async ()=> {
                await driver
                    .executeScript(`document.querySelectorAll('.v-textfield-search-input')[0].setAttribute("name","qqq");`);
                await driver
                    .executeScript("document.querySelectorAll('.v-button-search-button')[0].setAttribute('name','btntnntn');");

                const num = await "alaki K1007b01132 E5041d02000".split(' ');

                function loop(count, callback, done) {
                    var counter = 0;
                    var result;
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
                                                    .findElement(By.id('43_window_close'))
                                                    .then((errorElement) => {
                                                        // code does not have any data
                                                        if (result) {
                                                            result = result + num[counter] + " --> " + "null" + "\n";
                                                        } else {
                                                            result = num[counter] + " --> " + "null" + "\n";
                                                        }
                                                        driver
                                                            .findElement(By.id('43_window_close'))
                                                            .click()
                                                            .then(() => {
                                                                continue_app();
                                                        })
                                                    }, (err) => {
                                                        console.log("im running line 54");
                                                        driver
                                                            .findElement(By.id('btntnntn'))
                                                        driver
                                                            .executeScript(() => {
                                                                return document.querySelectorAll('.v-button-info-text-content > span > span')[0].innerText
                                                            }).then(function (innerHTML) {
                                                            // check content here
                                                            if (innerHTML) {
                                                                var order_code = String(innerHTML).replace(/\u200B/g, '')
                                                                if (result) {
                                                                    result = result + num[counter] + " --> " + order_code + "\n";
                                                                } else {
                                                                    result = num[counter] + " --> " + order_code + "\n";
                                                                }
                                                                continue_app();
                                                            }
                                                        });
                                                    })
                                            }, 6000)
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
                            // console.log(result);
                            await fs.writeFile('helloworld.txt', result, function (err) {
                                if (err) return console.log(err);
                                console.log("done...");
                            });
                            driver.quit();
                            // done && done();
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
        const url = "https://portal.endress.com/webapp/SparePartFinder/?lang=en&appcall=NEBP&upselling=true&target=_parent&shoptarget=_parent&hookurl=https://portal.endress.com/webapp/nebp-shopapp/entry/apps?%26country%3Dcom%26nebp.hookTarget%3Dhttps://www.endress.com/shop";
        console.log("------------------------------------------------* failed *----------------------------------------------------");
        console.log(e);
        driver.quit();
        await driver.get(url);
    }
}
web();

var sdd = document.querySelectorAll(".v-window-wrap");
console.log(sdd);
