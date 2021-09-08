const express = require("express");
const router = express.Router();

const gn = require("./../controller/genrator");

router
    .route("/genrateNums")
    .get(gn);

module.exports = router;
