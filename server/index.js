const app = require("./app");
// const db = require('./app/models');

app.listen(3459, () => {
    console.log("you can see your code here: http://localhost:3459/api/result")
})

// db.sequelize.sync();