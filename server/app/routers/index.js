
module.exports = (app) => {
  app.use("/api",
      require("./file"),
      require("./file.router"),
      require("./selenium.router"),
      require("./order_code.router"),
      require("./number_generator"),
  )
}