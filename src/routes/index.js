const homeRouter = require("./Home");
const customerRouter = require("./Customer");
const shipperRouter = require("./Shipper");
const menuRouter = require("./Menu");
const orderRouter = require("./Order");
const trashRouter = require("./Trash");
const { ensureAuthenticated } = require("../config/passport");

function route(app) {
  // app.use("/customer", ensureAuthenticated, customerRouter);
  // app.use("/shipper", ensureAuthenticated, shipperRouter);
  // app.use("/food", ensureAuthenticated, menuRouter);
  // app.use("/order", ensureAuthenticated, orderRouter);
  // app.use("/trash", ensureAuthenticated, trashRouter);
  app.use("/customer", customerRouter);
  app.use("/shipper", shipperRouter);
  app.use("/food", menuRouter);
  app.use("/order", orderRouter);
  app.use("/trash", trashRouter);
  app.use("/", homeRouter);
}

module.exports = route;
