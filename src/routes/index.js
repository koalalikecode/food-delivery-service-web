const homeRouter = require("./Home");
const customerRouter = require("./Customer");
const shipperRouter = require("./Shipper");
const menuRouter = require("./Menu");
const orderRouter = require("./Order");

function route(app) {
  app.use("/customer", customerRouter);
  app.use("/shipper", shipperRouter);
  app.use("/food", menuRouter);
  app.use("/order", orderRouter);
  app.use("/", homeRouter);
}

module.exports = route;
