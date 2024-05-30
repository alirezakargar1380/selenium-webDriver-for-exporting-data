const app = require("./app");
// const db = require('./app/models');

app.listen(3001, () => {
    console.log("you can see your code here: http://localhost:3001/api/result")
})

// db.sequelize.sync();