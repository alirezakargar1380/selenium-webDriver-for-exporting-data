const fs = require("fs")
const express = require("express");
const router = express.Router();
const db = require("../config/db");
// HTML FILES
const homePage = fs.readFileSync(__dirname+"/../public/index.html", "utf-8");
const card = fs.readFileSync(__dirname+"/../public/card.html", "utf-8");

router
    .route("/deleteAll")
    .post((req, res) => {
        db.query(`DELETE FROM order_code`, (err, result) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.send(result)
            }
        });
    })


router
    .route("/result")
    .get((req, res) => {
        db.query(`SELECT * FROM order_code`, (err, result) => {
            if (err) {
                console.log(err)
            }
            const page = result.map( item => {
                return card
                    .replace(/{%PP%}/g, item.order_code)
                    .replace(/{%NAME%}/g, item.id)
                    .replace(/{%STATUS%}/g, item.checked_status)
                    .replace(/{%EXTEND%}/g, item.extend)
                    .replace(/{%AVALIBLE%}/g, item.avalible);
            }).join('')
            const outPut = homePage.replace('{%PRODUCTNAME%}', page)
            send(outPut)
            // send(homePage)
        });
        function send(outPut) {
            res.writeHead(200, {
                'Content-type': 'text/html'
            });
            res.end(outPut);
        }
    })

module.exports = router;