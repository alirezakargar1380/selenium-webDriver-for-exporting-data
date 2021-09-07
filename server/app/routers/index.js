
module.exports = (app) => {
  app.use("/api",
      require("./file"),
      require("./genrator"),
      require("./handeling"),
      require("./selenium"),
      require("./selenium.router"),
      require("./order_code.router"),
  )
}