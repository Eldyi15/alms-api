const userRouter = require("./user.routes");

exports.init = (app) => {
  app.use("/api/v1/users", userRouter);
};
