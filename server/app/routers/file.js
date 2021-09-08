const express = require("express");
const router = express.Router();
const db = require("../config/db");
const fs = require("fs");
const persianDate = require("persian-date");

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

router
    .route("/getFile")
    .get((req, response) => {
        const get_Avalble = (cellback) => {
            db.query(`SELECT * FROM order_code WHERE avalible = 1`, (err, result) => {
                if (err) {
                    res.status(400).send(err);
                } else {
                    return cellback(result)
                }
            });
        }

        get_Avalble((res) => {
            if (res) {
                var data = "";
                var date = new Date();
                res.forEach( item => {
                    if (data) {
                        data = data+'\n'+item.id+")  "+item.order_code+" --> "+item.extend;
                    } else {
                        data = item.id+")  "+item.order_code+" --> "+item.extend;
                    }

                });
                var fileName = getPersianDate();
                fs.writeFile(`${__dirname}/../Files/${fileName}.txt`, data, (err, result) => {
                    // if (err) return err;
                    console.log("file was created");
                    response
                        .status(200)
                })
            } else {
                response
                    .status(404)
            }
        })
    })

module.exports = router;
