const fs = require('fs');
const express = require("express");
const cors = require('cors');
// controllers
const selenium = require("./routers/selenium");
const genra = require("./routers/genrator");
const handleling = require("./routers/handeling");
const file = require("./routers/file");

const app = express();
app.use(express.static(`${__dirname}/public`));
app.use(cors(), genra, selenium, handleling, file);

app.listen(3001, () => {
    console.log("you can see your code here: http://localhost:3001/result")
})
