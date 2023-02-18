const cors = require("cors");

exports.init = (app) => {
  app.use(
    cors({
      origin: ["http://localhost:4200"],
      methods: ["POST", "PATCH", "PUT", "DELETE", "GET"],
    })
  );
};
