const db = require("./config/db");

const array = ["12", "34", "56", "78", "90", "AB", "CD", "EF", "GH", "IJ", "KL"];
var nums = [];
for (i=0 ; i < array.length; i++) {
    if ( i === 0 ) { var aval = array[i].split(""); }
    if ( i === 1 ) { var dovom = array[i].split(""); }
    if ( i === 2 ) { var sevom = array[i].split(""); }
    if ( i === 3 ) { var chaharom = array[i].split(""); }
    if ( i === 4 ) { var panjom = array[i].split(""); }
    if ( i === 5 ) { var shishom = array[i].split(""); }
    if ( i === 6 ) { var haftom = array[i].split(""); }
    if ( i === 7 ) { var hashtom = array[i].split(""); }
    if ( i === 8 ) { var nohom = array[i].split(""); }
    if ( i === 9 ) { var dahom = array[i].split(""); }
    if ( i === 10 ) { var yazdahom = array[i].split(""); }
}

// -----------------------------------------------  push the variable  ------------------------------------------ //
for (a=0 ; a < aval.length; a++) {
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
                                                    if (hashtom){
                                                        for (h = 0; h < hashtom.length; h++) {
                                                            if (nohom) {
                                                                for (i = 0; i < nohom.length; i++) {
                                                                    if (dahom) {
                                                                        for (j = 0; j < dahom.length; j++) {
                                                                            if (yazdahom) {
                                                                                for (k = 0; k < dahom.length; k++) {
                                                                                    nums.push(aval[a]+dovom[b]+sevom[c]+chaharom[d]+panjom[e]+shishom[f]+haftom[g]+hashtom[h]+nohom[i]+dahom[j]+yazdahom[k])
                                                                                }
                                                                            } else { nums.push(aval[a]+dovom[b]+sevom[c]+chaharom[d]+panjom[e]+shishom[f]+haftom[g]+hashtom[h]+nohom[i]+dahom[j]) }
                                                                        }
                                                                    } else { nums.push(aval[a]+dovom[b]+sevom[c]+chaharom[d]+panjom[e]+shishom[f]+haftom[g]+hashtom[h]+nohom[i]) }
                                                                }
                                                            } else { nums.push(aval[a]+dovom[b]+sevom[c]+chaharom[d]+panjom[e]+shishom[f]+haftom[g]+hashtom[h]) }
                                                        }
                                                    } else { nums.push(aval[a]+dovom[b]+sevom[c]+chaharom[d]+panjom[e]+shishom[f]+haftom[g]) }
                                                }
                                            } else { nums.push(aval[a]+dovom[b]+sevom[c]+chaharom[d]+panjom[e]+shishom[f]) }
                                        }
                                    } else { nums.push(aval[a]+dovom[b]+sevom[c]+chaharom[d]+panjom[e]) }
                                }
                            } else { nums.push(aval[a]+dovom[b]+sevom[c]+chaharom[d]) }
                        }
                    } else { nums.push(aval[a]+dovom[b]+sevom[c]) }
                }
            } else { nums.push(aval[a]+dovom[b]) }
        }
    } else { nums.push(aval[a]) }
}

nums.forEach( (items) => {
    db.query(`INSERT INTO order_code SET order_code = "${items}" `, (err, res) => {
        if (err) {
            console.log(err)
        }
        console.log("created : "+ res.insertId);
    });
})
