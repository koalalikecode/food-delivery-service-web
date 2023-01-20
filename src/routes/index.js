const homeRouter = require("./Home");
const customerRouter = require("./Customer");

function route(app) {
  app.use("/customer", customerRouter);
  app.use("/", homeRouter);
}

module.exports = route;
