const userRouter = require("./user.routes");
const logBookRouter = require("./logbook.routes");
const aggregateRouter = require("./aggregate.routes");

exports.init = (app) => {
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/logbooks", logBookRouter);
  app.use("/api/v1/aggregate", aggregateRouter);
};
