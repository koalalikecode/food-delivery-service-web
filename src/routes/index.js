const homeRouter = require("./Home");

function route(app) {
  app.use("/", homeRouter);
}

module.exports = route;
