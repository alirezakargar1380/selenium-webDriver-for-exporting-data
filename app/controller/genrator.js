const db = require("./../../config/db");

module.exports = (req, res) => {
    const array = [req.query.one,
        req.query.two,
        req.query.three,
        req.query.four,
        req.query.five,
        req.query.six,
        req.query.seven,
        req.query.eight,
        req.query.nine,
        req.query.ten,
        req.query.eleven,
    ];

    for (i = 0; i < array.length; i++) {
        if (i === 0) {
            if (req.query.one.length >= 1) {
                var aval = req.query.one.split("");
            }
        }
        if (i === 1) {
            if (req.query.two.length >= 1) {
            var dovom = req.query.two.split("");
            }
        }
        if (i === 2) {
            if (req.query.three.length >= 1) {
            var sevom = req.query.three.split("");
            }
        }
        if (i === 3) {
            if (req.query.four.length >= 1) {
                var chaharom = req.query.four.split("");
            }
        }
        if (i === 4) {
            if ( req.query.five.length >= 1 ) {
                var panjom = req.query.five.split("");
            }
        }
        if (i === 5) {
            if ( req.query.six.length >= 1 ) {
                var shishom = req.query.six.split("");
            }
        }
        if (i === 6) {
            if ( req.query.seven.length >= 1 ) {
                var haftom = req.query.seven.split("");
            }
        }
        if (i === 7) {
            if ( req.query.eight.length >= 1 ) {
                var hashtom = req.query.eight.split("");
            }
        }
        if (i === 8) {
            if ( req.query.nine.length >= 1 ) {
                var nohom = req.query.nine.split("");
            }
        }
        if (i === 9) {
            if ( req.query.ten.length >= 1 ) {
                var dahom = req.query.ten.split("");
            }
        }
        if (i === 10) {
            if ( req.query.eleven.length >= 1 ) {
                var yazdahom = req.query.eleven.split("");
            }
        }
    }

    // -----------------------------------------------  push the variable  ------------------------------------------ //

    function insert(items) {
        db.query(`INSERT INTO order_code SET order_code = "${items}", checked_status = "0", extend = "-", avalible = "0" `)
    }

    for (a = 0; a < aval.length; a++) {
        if (dovom) {
            for (b = 0; b < dovom.length; b++) {
                if (sevom) {
                    for (c = 0; c < sevom.length; c++) {
                        if (chaharom) {
                            for (d = 0; d < chaharom.length; d++) {
                                if (panjom) {
                                    for (e = 0; e < panjom.length; e++) {
                                        if (shishom) {
                                            for (f = 0; f < shishom.length; f++) {
                                                if (haftom) {
                                                    for (g = 0; g < haftom.length; g++) {
                                                        if (hashtom) {
                                                            for (h = 0; h < hashtom.length; h++) {
                                                                if (nohom) {
                                                                    for (i = 0; i < nohom.length; i++) {
                                                                        if (dahom) {
                                                                            for (j = 0; j < dahom.length; j++) {
                                                                                if (yazdahom) {
                                                                                    for (k = 0; k < yazdahom.length; k++) {
                                                                                        var items = aval[a] + dovom[b] + sevom[c] + chaharom[d] + panjom[e] + shishom[f] + haftom[g] + hashtom[h] + nohom[i] + dahom[j] + yazdahom[k];
                                                                                        insert(items)
                                                                                    }
                                                                                } else {
                                                                                    var items = aval[a] + dovom[b] + sevom[c] + chaharom[d] + panjom[e] + shishom[f] + haftom[g] + hashtom[h] + nohom[i] + dahom[j];
                                                                                    insert(items)
                                                                                }
                                                                            }
                                                                        } else {
                                                                            var items = aval[a] + dovom[b] + sevom[c] + chaharom[d] + panjom[e] + shishom[f] + haftom[g] + hashtom[h] + nohom[i];
                                                                            insert(items)
                                                                        }
                                                                    }
                                                                } else {
                                                                    var items = aval[a] + dovom[b] + sevom[c] + chaharom[d] + panjom[e] + shishom[f] + haftom[g] + hashtom[h];
                                                                    insert(items)
                                                                }
                                                            }
                                                        } else {
                                                            var items = aval[a] + dovom[b] + sevom[c] + chaharom[d] + panjom[e] + shishom[f] + haftom[g];
                                                            insert(items)
                                                        }
                                                    }
                                                } else {
                                                    var items = aval[a] + dovom[b] + sevom[c] + chaharom[d] + panjom[e] + shishom[f];
                                                    insert(items)
                                                }
                                            }
                                        } else {
                                            var items = aval[a] + dovom[b] + sevom[c] + chaharom[d] + panjom[e];
                                            insert(items)
                                        }
                                    }
                                } else {
                                    var items = aval[a] + dovom[b] + sevom[c] + chaharom[d];
                                    insert(items)
                                }
                            }
                        } else {
                            var items = aval[a] + dovom[b] + sevom[c];
                            insert(items)
                        }
                    }
                } else {
                    var items = aval[a] + dovom[b];
                    insert(items)
                }
            }
        } else {
            var items = aval[a];
            insert(items)
        }
    }
    console.log("procces is finish")
    res.status(200).send("success")
}